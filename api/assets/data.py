import pandas as pd

from redis_con import CoincideRedis

r = CoincideRedis()


def key_compose(ticker, _type):
    return f"{{{_type}}}.{ticker}"


def parse_info(df):
    columns = ["employees", "summary", "city", "state", "country", "website", "dividendYield",
               "logo_url", "industry", "longName", "symbol"]
    df = df.rename(columns={"fullTimeEmployees": "employees", "longBusinessSummary": "summary"})[columns]
    return df.to_dict(orient="records")[0]


def parse_series(df):
    _filter = (pd.to_datetime(df.index) > (pd.to_datetime(df.index[-1]) - pd.DateOffset(years=1)))
    columns = ["Close", "Dividends", "Volume", "Date"]
    _rename = {"Close": "close", "Dividends": "dividends", "Volume": "volume", "Date": "date"}
    df.index = df.index.strftime("%Y-%m-%d")
    df = df[_filter].reset_index()[columns].rename(columns=_rename)
    historic = df.to_dict(orient="records")
    return historic


def get_symbols(symbols):
    results = []
    for symbol in symbols:
        results.append({
            "symbol": symbol,
            "historic": parse_series(r.get_parquet(key_compose(symbol, "historic"))),
            "info": parse_info(r.get_parquet(key_compose(symbol, "info")))
        })
    return results


def list_assets():
    keys = r.list_redis_keys()
    symbols = []
    for k in keys:
        _key = k.decode("utf-8").split("}.")
        if len(_key) > 1:
            symbols.append(_key[1])
    return list(set(symbols))
