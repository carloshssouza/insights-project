import os
from flask import Flask, request, jsonify, Response
from flask_cors import CORS, cross_origin
from data import get_symbols, list_assets

import prometheus_client
from prometheus_client import Counter, Histogram
import time


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


@app.route("/assets")
@cross_origin()
def assets_list():
    graphs["c"].inc()
    start = time.time()
    try:
        assets = sorted(list_assets())
        response = jsonify(assets)
        graphs["h"].observe(time.time() - start)
        return response
    except Exception as e:
        graphs["e"].inc()
        return str(e)


@app.route("/assets/info", methods=["POST"])
@cross_origin()
def get_assets_info():
    graphs["c"].inc()
    start = time.time()
    try:
        symbols = request.get_json().get("symbols", [])
        assets_info = get_symbols(symbols)
        response = jsonify(assets_info)
        graphs["h"].observe(time.time() - start)
        return response
    except Exception as e:
        graphs["e"].inc()
        return str(e)


if __name__ == "__main__":
    app.run()