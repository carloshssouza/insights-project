import redis
from io import BytesIO
import pandas as pd


class CoincideRedis:
    def __init__(self):
        self.client = redis.Redis(host="localhost", port=6379)

    def set_parquet(self, key, df):
        buffer = BytesIO()
        df.to_parquet(buffer, compression="gzip")
        self.client.set(key, buffer.getvalue())

    def get_parquet(self, key):
        buffer = BytesIO(self.client.get(key))
        df = pd.read_parquet(buffer)
        return df