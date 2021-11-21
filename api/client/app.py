import os
from flask import Flask, request, jsonify, Response
from flask_cors import CORS, cross_origin
from flask_sqlalchemy import SQLAlchemy

import prometheus_client
from prometheus_client import Counter, Histogram
import time


app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
app.config.from_object(os.environ["APP_SETTINGS"])
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)

from model import Client


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


@app.route("/clients")
@cross_origin()
def client_list():
    graphs["c"].inc()
    start = time.time()
    try:
        clients = Client.query.filter_by(status=1).all()
        response = jsonify([e.serialize() for e in clients])
        graphs["h"].observe(time.time() - start)
        return response
    except Exception as e:
        graphs["e"].inc()
        return str(e)


@app.route("/client/<id_>")
@cross_origin()
def client_get_by_id(id_):
    graphs["c"].inc()
    start = time.time()
    try:
        client = Client.query.filter_by(id=id_).first()
        response = jsonify(client.serialize())
        graphs["h"].observe(time.time() - start)
        return response
    except Exception as e:
        graphs["e"].inc()
        return str(e)


@app.route("/client/create", methods=["POST"])
@cross_origin()
def client_create():
    graphs["c"].inc()
    start = time.time()
    try:
        client_input = request.get_json()
        client = Client(**client_input)
        db.session.add(client)
        db.session.commit()
        graphs["h"].observe(time.time() - start)
        return f"New client registered {client.id}"
    except Exception as e:
        graphs["e"].inc()
        return str(e)


@app.route("/client/update/<id_>", methods=["POST"])
@cross_origin()
def client_update(id_):
    graphs["c"].inc()
    start = time.time()
    try:
        client_input = request.get_json()
        client = Client.query.filter_by(id=id_).update(dict(**client_input))
        db.session.commit()
        response = jsonify(client)
        graphs["h"].observe(time.time() - start)
        return response
    except Exception as e:
        graphs["e"].inc()
        return str(e)


@app.route("/client/delete/<id_>", methods=["GET"])
@cross_origin()
def client_remove(id_):
    graphs["c"].inc()
    start = time.time()
    try:
        client = Client.query.filter_by(id=id_).update(dict(status=0))
        db.session.commit()
        response = jsonify(client)
        graphs["h"].observe(time.time() - start)
        return response
    except Exception as e:
        graphs["e"].inc()
        return str(e)


if __name__ == "__main__":
    app.run()
