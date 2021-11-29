import ssl
import websocket
import logging
import ast
from data import save_data_store, get_data_store
import pandas as pd


context = ssl.create_default_context()
logger = logging.getLogger("app")


def collect_frequency(messages):
    try:
        df = get_data_store("frequency")
        new_df = pd.DataFrame(messages)
        category_count = new_df["category"].value_counts().rename_axis("category").reset_index(name="count")
        category_count["publication_date"] = messages[0]["publication_date"]
        merged = pd.concat([df, category_count]).groupby(['publication_date', 'category']).sum().reset_index()
        logger.info(merged)
        save_data_store(merged, "frequency", "category")
    except Exception as e:
        print(e)
        logger.error(e)


def collect_top(messages):
    try:
        df = get_data_store("top10")
        new_df = pd.DataFrame(messages)
        assets_count = new_df["name"].value_counts().rename_axis("name").reset_index(name="count")
        merged = pd.concat([df, assets_count]).groupby(['name']).sum().reset_index()
        save_data_store(merged, "top10", "name")
    except Exception as e:
        print(e)
        logger.error(e)


def on_message(ws, messages):
    _msgs = ast.literal_eval(messages)
    collect_frequency(_msgs)
    collect_top(_msgs)


def on_error(ws, error):
    logger.error(f"--- Websocket Error ---\nMessage:{error}")


def on_close(ws, close_status_code, close_msg):
    logger.info(f"--- Connection Closed ---\nStatus:{close_status_code}\nMessage:{close_msg}")


if __name__ == "__main__":
    websocket.enableTrace(True)
    ws = websocket.WebSocketApp("ws://publisher_service:8001/stream/products?email=analytics",
                                on_message=on_message,
                                on_error=on_error,
                                on_close=on_close)

    while True:
        try:
            ws.run_forever()
        except:
            pass