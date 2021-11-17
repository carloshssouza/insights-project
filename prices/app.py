from __future__ import print_function
import os
import grpc
import sys
from concurrent import futures
import json
import pandas as pd
import yfinance as yf

from insights_pb2 import InfoResponse, RawPriceResponse
import insights_pb2_grpc as grpc_service


prices_port = os.environ.get("PRICES_PORT", "8888")


def get_series(ticker, start_date, end_date):
    try:
        historic = ticker.history(start=start_date, end=end_date)
        historic.index = historic.index.strftime("%Y-%m-%d")
        return historic.to_dict()
    except AttributeError:
        return None


def get_info(ticker):
    #info = pd.DataFrame.from_dict(ticker.info, orient="index").to_dict()[0]
    return ""
    #return info.get("longName", "")


def simple_historical(symbols, start_date, end_date):
    adj_close = pd.DataFrame()
    for symbol in symbols:
        ticker = yf.Ticker(symbol)
        hist = ticker.history(start=start_date, end=end_date)
        adj_close[symbol] = hist["Close"]
    return adj_close.to_dict(orient="records")


def multi_builder(name, pbuff_obj, series):
    for k, v in series[name].items():
        if v:
            multi_obj = pbuff_obj.add()
            multi_obj.date = k
            multi_obj.value = float(v)
    return pbuff_obj


def response_builder(name, series):
    info_response = InfoResponse()
    info_response.name = name if name is not None else ""
    multi_builder("Close", info_response.prices, series)
    multi_builder("Volume", info_response.volumes, series)
    multi_builder("Dividends", info_response.dividends, series)
    return info_response


def server_setup():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    grpc_service.add_InfoServicer_to_server(InfoServicer(), server)
    server.add_insecure_port(f"prices_service:{prices_port}")
    try:
        server.start()
        print(f"Server is running on prices_service:{prices_port}", file=sys.stderr)
        server.wait_for_termination()
    except KeyboardInterrupt:
        print("Stopping prices service", file=sys.stderr)
        server.stop(0)


class InfoServicer(grpc_service.InfoServicer):
    def GetInfo(self, request, context):
        ticker = yf.Ticker(request.ticker)
        series = get_series(ticker, request.start_date, request.end_date)
        if not series:
            return InfoResponse()
        name = get_info(ticker)
        result = response_builder(name, series)
        return result

    def GetPrices(self, request, context):
        print(request, file=sys.stderr)
        records = simple_historical(request.tickers, request.start_date, request.end_date)
        result = json.dumps(records)
        prices_response = RawPriceResponse()
        prices_response.raw = result
        print(prices_response, file=sys.stderr)
        return prices_response


if __name__ == "__main__":
    print(f"Starting prices server on port {prices_port}", file=sys.stderr)
    server_setup()
