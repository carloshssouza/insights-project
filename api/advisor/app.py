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

from model import Advisor

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
    start = time.time()
    response = {"status": 200}
    graphs["h"].observe(time.time() - start)
    return response


@app.route("/metrics")
def prometheus_metrics():
    res = []
    for k, v in graphs.items():
        res.append(prometheus_client.generate_latest(v))
    return Response(res, mimetype="text/plain")


@app.route("/advisors")
@cross_origin()
def advisor_list():
    graphs["c"].inc()
    start = time.time()
    try:
        advisors = Advisor.query.filter_by(status=1).all()
        response = jsonify([e.serialize() for e in advisors])
        graphs["h"].observe(time.time() - start)
        return response
    except Exception as e:
        graphs["e"].inc()
        return str(e)


@app.route("/advisor/<id_>")
@cross_origin()
def advisor_get_by_id(id_):
    graphs["c"].inc()
    start = time.time()
    try:
        advisor = Advisor.query.filter_by(id=id_).first()
        response = jsonify(advisor.serialize())
        graphs["h"].observe(time.time() - start)
        return response
    except Exception as e:
        graphs["e"].inc()
        return str(e)


@app.route("/advisor/create", methods=["POST"])
@cross_origin()
def advisor_create():
    graphs["c"].inc()
    start = time.time()
    try:
        advisor_input = request.get_json()
        advisor = Advisor(**advisor_input)
        db.session.add(advisor)
        db.session.commit()
        graphs["h"].observe(time.time() - start)
        return f"New advisor registered {advisor.id}"
    except Exception as e:
        graphs["e"].inc()
        return str(e)


@app.route("/advisor/update/<id_>", methods=["POST"])
@cross_origin()
def advisor_update(id_):
    graphs["c"].inc()
    start = time.time()
    try:
        advisor_input = request.get_json()
        advisor = Advisor.query.filter_by(id=id_).update(dict(**advisor_input))
        db.session.commit()
        response = jsonify(advisor)
        graphs["h"].observe(time.time() - start)
        return response
    except Exception as e:
        graphs["e"].inc()
        return str(e)


@app.route("/advisor/delete/<id_>", methods=["GET"])
@cross_origin()
def advisor_remove(id_):
    graphs["c"].inc()
    start = time.time()
    try:
        advisor = Advisor.query.filter_by(id=id_).update(dict(status=0))
        db.session.commit()
        response = jsonify(advisor)
        graphs["h"].observe(time.time() - start)
        return response
    except Exception as e:
        graphs["e"].inc()
        return str(e)


@app.route("/advisor/login", methods=["POST"])
@cross_origin()
def advisor_login():
    graphs["c"].inc()
    start = time.time()
    try:
        response = "User not found"
        _input = request.get_json()
        advisor = Advisor.query.filter(Advisor.email == _input["email"],
                                       Advisor.password == _input["password"]).first()
        if advisor:
            response = {"id": advisor.id}
        graphs["h"].observe(time.time() - start)
        return response
    except Exception as e:
        graphs["e"].inc()
        return str(e)


if __name__ == "__main__":
    app.run()