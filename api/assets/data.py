import pandas as pd
from utils.redis_con import CoincideRedis


r = CoincideRedis()


def key_compose(ticker, _type):
    return f"{{{_type}}}.{ticker}"


def parse_info(df):
    columns = ["employees", "summary", "city", "state", "country", "website", "dividendYield",
               "logo_url", "industry", "longName", "symbol"]
    df = df.rename(columns={"fullTimeEmployees": "employees", "longBusinessSummary": "summary"})[columns]
    return df.to_dict(orient="records")[0]


def parse_series(symbol, df):
    _filter = (pd.to_datetime(df.index) > (pd.to_datetime(df.index[-1]) - pd.DateOffset(years=1)))
    columns = ["Close", "Dividends", "Volume", "Date"]
    _rename = {"Close": "close", "Dividends": "dividends", "Volume": "volume", "Date": "date"}
    df.index = df.index.strftime("%Y-%m-%d")
    df = df[_filter].reset_index()[columns].rename(columns=_rename)
    historic = df.to_dict(orient="records")
    return {
        "symbol": symbol,
        "historic": historic,
    }


def parse_results(symbol, df, _type):
    if _type == "info":
        return parse_info(df)
    else:
        return parse_series(symbol, df)


def get_symbols(symbols, _type="historic"):
    results = {}
    for symbol in symbols:
        results[symbol] = r.get_parquet(key_compose(symbol, _type))
    return results


def list_assets():
    keys = r.list_redis_keys()
    symbols = []
    for k in keys:
        symbols.append(k.decode("utf-8").split("}.")[1])
    return list(set(symbols))


def get_assets(symbols, _type):
    results = []
    _results = get_symbols(symbols, _type=_type)
    for k, v in _results.items():
        results.append(parse_results(k, v, _type))

    return results
