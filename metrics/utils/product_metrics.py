from datetime import datetime
from dateutil.relativedelta import relativedelta
import numpy as np
import math


class Metrics:
    def __init__(self, request) -> None:
        self.ticker = request.ticker

    @staticmethod
    def filter(num):
        if math.isnan(float(num)):
            return 0
        return num

    @staticmethod
    def returns(close):
        return close.pct_change().fillna(0)

    def cumulative_return(self, close):
        return self.returns(close).add(1).cumprod().sub(1)

    def mean_return(self, close):
        return self.filter(self.returns(close).mean())

    def mean_volume(self, volume):
        return self.filter(volume.mean())

    def mean_price(self, prices):
        n = np.count_nonzero(prices)
        return self.filter(np.sum(prices) / n)

    def return_12m(self, close):
        return self.filter(self.cumulative_return(close)[-1])

    def dividend_yield_calc(self, dividends, mean_price):
        n = np.count_nonzero(dividends)
        return self.filter((np.sum(dividends)/n) / mean_price)

    def get_metrics(self, data):
        mean_p = self.mean_price(data["close"])
        return {
            "dividend_yield": self.dividend_yield_calc(data["dividend"], mean_p) * 100,
            "mean_daily_return": self.mean_return(data["close"]) * 100,
            "mean_daily_volume": self.mean_volume(data["volume"]),
            "forecast12m": 0.42,
            "return12m": self.return_12m(data["close"]) * 100,
            "price": data["close"][-1],
        }
