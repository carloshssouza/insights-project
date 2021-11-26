import os
from flask import Flask, jsonify, Response
from flask_cors import CORS, cross_origin

import prometheus_client
from prometheus_client import Counter, Histogram
import time


import ssl
import websocket
import logging
import ast
from data import get_data_store, save_data_store
import pandas as pd

logger = logging.getLogger("app")

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
app.config.from_object(os.environ["APP_SETTINGS"])
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
context = ssl.create_default_context()

_INF = float("inf")
graphs = dict()
graphs["c"] = Counter("request_operations_total", "Total number of processed requests")
graphs["e"] = Counter("request_exceptions_total", "Total number of exception requests")
graphs["h"] = Histogram("request_duration_seconds", "Request duration in seconds",
                        buckets=(1, 2, 5, 6, 10, _INF))


@app.route("/")
@cross_origin()
def hello():
    graphs["c"].inc()
    return {"status": 200}


@app.route("/metrics")
def prometheus_metrics():
    res = []
    for k, v in graphs.items():
        res.append(prometheus_client.generate_latest(v))
    return Response(res, mimetype="text/plain")


@app.route("/analytics/top10")
@cross_origin()
def top_10_products():
    graphs["c"].inc()
    start = time.time()
    try:
        data = get_data_store("analytics-top").sort_values("count", ascending=False)
        top_10 = data.head(10).to_dict(orient="records")
        response = jsonify(top_10)
        graphs["h"].observe(time.time() - start)
        return response
    except Exception as e:
        graphs["e"].inc()
        return str(e)


@app.route("/analytics/frequency")
@cross_origin()
def products_frequency():
    graphs["c"].inc()
    start = time.time()
    try:
        data = get_data_store("analytics-counter").sort_values("publication_date", ascending=True)
        products = data.to_dict(orient="records")
        response = jsonify(products)
        graphs["h"].observe(time.time() - start)
        return response
    except Exception as e:
        graphs["e"].inc()
        return str(e)


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
    app.run()
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