import os
import grpc
from concurrent import futures
from datetime import datetime

import pandas as pd
import yfinance as yf

from coincide_pb2 import InfoResponse
import coincide_pb2_grpc as grpc_service


prices_host = os.environ.get("PRICES_HOST", "localhost")
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
    session = requests_cache.CachedSession('yfinance.cache')
    session.headers['User-agent'] = 'insights/1.0'
    for symbol in symbols:
        ticker = yf.Ticker(symbol, session=session)
        hist = ticker.history(start=start_date, end=end_date)
        adj_close[symbol] = hist["Close"]
    return adj_close.to_dict(orient=records)


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
    server.add_insecure_port(f"{prices_host}:{prices_port}")
    try:
        server.start()
        print(f"Server is running on {prices_host}:{prices_port}")
        server.wait_for_termination()
    except KeyboardInterrupt:
        print("Stopping prices service")
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
        records = simple_historical(request.tickers, request.start_date, request.end_date)
        result = json.dumps(records)
        return result

if __name__ == "__main__":
    print(f"Starting prices server on port {prices_port}")
    server_setup()
