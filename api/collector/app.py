import os
from flask import Flask, jsonify, Response
from flask_cors import CORS, cross_origin

import prometheus_client
from prometheus_client import Counter, Histogram
import time

import logging
from data import get_data_store, clean_collection

logger = logging.getLogger("app")

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
app.config.from_object(os.environ["APP_SETTINGS"])
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

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
        data = get_data_store("top10").sort_values("count", ascending=False)
        logger.info(data)
        top_10 = data.head(10).to_dict(orient="records")
        response = jsonify(top_10)
        graphs["h"].observe(time.time() - start)
        return response
    except Exception as e:
        graphs["e"].inc()
        logger.error(e)
        return str(e)


@app.route("/analytics/frequency")
@cross_origin()
def products_frequency():
    graphs["c"].inc()
    start = time.time()
    try:
        data = get_data_store("frequency").sort_values("publication_date", ascending=True)
        logger.info(data)
        products = data.to_dict(orient="records")
        response = jsonify(products)
        graphs["h"].observe(time.time() - start)
        return response
    except Exception as e:
        graphs["e"].inc()
        logger.error(e)
        return str(e)


@app.route("/analytics/clean/<collection_name>")
@cross_origin()
def cleaner(collection_name):
    graphs["c"].inc()
    start = time.time()
    try:
        r = clean_collection(collection_name)
        graphs["h"].observe(time.time() - start)
        return r
    except Exception as e:
        graphs["e"].inc()
        logger.error(e)
        return str(e)


if __name__ == "__main__":
    app.run()
