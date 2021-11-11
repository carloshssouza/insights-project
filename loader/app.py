import yfinance as yf
import pandas as pd
from utils.redis import CoincideRedis
import requests
from bs4 import BeautifulSoup, Tag

r = CoincideRedis()


def get_info(symbols):
    #data = dict()
    for ticker in symbols:
        print(f"Getting {ticker}")
        ticker_object = yf.Ticker(ticker)
        df = pd.DataFrame.from_dict(ticker_object.info, orient="index").transpose()
        #data[ticker] = df
        r.set_parquet(key_compose(ticker, "info"), df)
        print(f"Cached {ticker}")
    #return data


def get_historic(symbols):
    # data = dict()
    for ticker in symbols:
        print(f"Getting {ticker}")
        ticker_object = yf.Ticker(ticker)
        df = ticker_object.history(period="5y")
        if not df.empty:
            # data[ticker] = df
            r.set_parquet(key_compose(ticker, "historic"), df)
            print(f"Cached {ticker}")
    # return data


def key_compose(ticker, _type):
    return f"{{{_type}}}.{ticker}"


def load_symbols(symbols, _type="historic"):
    data = get_info(symbols) if _type == "info" else get_historic(symbols)
    # for k, v in data.items():
    #     r.set_parquet(key_compose(k, _type), v)


def get_symbols(symbols, _type="historic"):
    results = {}
    for symbol in symbols:
        results[symbol] = r.get_parquet(key_compose(symbol, _type))
    return results


def symbols():
    df = pd.read_csv("ticker.csv")
    br_df = df[df["Ticker"].str.contains("\.SA")]
    return br_df["Ticker"].to_list()


# print(r.client.keys())
print(get_symbols(["ITSA4.SA"], "historic").get("ITSA4.SA"))
x = 0
# load_symbols(symbols=symbols(), _type="info")
#load_symbols(symbols=symbols(), _type="historic")
