import pymongo
import logging
import pandas as pd


mongo = pymongo.MongoClient("mongodb://admin:admin@mongo_db:27017/")
analytics_db = mongo["analytics"]

logger = logging.getLogger("data")


def save_data_store(df, collection_name, name):
    try:
        data = df.to_dict(orient="records")
        collection = analytics_db[collection_name]
        for d in data:
            x = collection.replace_one({name: d[name]}, d, upsert=True)
    except Exception as e:
        logger.error(e)


def get_data_store(collection_name):
    try:
        collection = analytics_db[collection_name]
        data = collection.find({}, {'_id': False})
        logger.info(f"GETTING ANALYTIC {data}")
        return pd.DataFrame(data)
    except Exception as e:
        logger.error(e)