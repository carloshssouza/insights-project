import pymongo
import logging
import pandas as pd


mongo = pymongo.MongoClient("mongodb://admin:admin@mongo_db:27017/")
analytics_db = mongo["analytics"]

logger = logging.getLogger("app")


def get_data_store(collection_name):
    try:
        collection = analytics_db[collection_name]
        data = collection.find({}, {'_id': False})
        logger.info(f"GETTING ANALYTIC {data}")
        return pd.DataFrame(data)
    except Exception as e:
        logger.error(e)


def clean_collection(collection_name):
    try:
        collection = analytics_db[collection_name]
        collection.drop()
        return {"status": f"Collection {collection_name} cleaned"}
    except Exception as e:
        logger.error(e)