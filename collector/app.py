import ssl
import websocket
import logging
import ast
from data import get_data_store, save_data_store
import pandas as pd

logger = logging.getLogger("app")


context = ssl.create_default_context()


def collect_frequency(messages):
    df = get_data_store("analytics-counter")
    new_df = pd.DataFrame(messages)
    category_count = new_df["category"].value_counts().rename_axis("category").reset_index(name="count")
    category_count["publication_date"] = messages[0]["publication_date"]
    merged = pd.concat([df, category_count]).groupby(['publication_date', 'category']).sum().reset_index()
    logger.info(merged)
    save_data_store(merged, "analytics-counter")


def collect_top(messages):
    df = get_data_store("analytics-top")
    new_df = pd.DataFrame(messages)
    assets_count = new_df["name"].value_counts().rename_axis("name").reset_index(name="count")
    merged = pd.concat([df, assets_count]).groupby(['name']).sum().reset_index()
    logger.info(merged)
    save_data_store(merged, "analytics-top")


def on_message(ws, messages):
    _msgs = ast.literal_eval(messages)
    _messages = list()
    collect_frequency(_msgs)
    collect_top(_msgs)


def on_error(ws, error):
    logger.error(f"--- Websocket Error ---\nMessage:{error}")


def on_close(ws, close_status_code, close_msg):
    logger.info(f"--- Connection Closed ---\nStatus:{close_status_code}\nMessage:{close_msg}")


if __name__ == "__main__":
    websocket.enableTrace(True)
    ws = websocket.WebSocketApp("ws://publisher_service:8001/stream/products?email=all",
                                on_message=on_message,
                                on_error=on_error,
                                on_close=on_close)

    while True:
        try:
            ws.run_forever()
        except:
            pass