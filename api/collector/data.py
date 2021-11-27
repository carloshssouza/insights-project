import pystore
import pandas as pd
import logging

logger = logging.getLogger("app")
pystore.set_path('pystore')
store = pystore.store("insights")
collection = store.collection("analytics")


def get_data_store(collection_name):
    try:
        df = collection.item(collection_name).to_pandas()
    except ValueError:
        df = pd.DataFrame()
    return df


def save_data_store(df, collection_name):
    collection.write(collection_name, df, overwrite=True)