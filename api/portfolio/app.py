import os
from flask import Flask, request, jsonify, Response
from flask_cors import CORS, cross_origin
from flask_sqlalchemy import SQLAlchemy

import prometheus_client
from prometheus_client import Counter, Histogram
import time
import sys

sys.stdout.flush()

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
app.config.from_object(os.environ["APP_SETTINGS"])
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)

from model import Portfolio, Product, Client
from utils import get_portfolio_metrics, send_notifications


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


@app.route("/portfolios/client/<id_>")
@cross_origin()
def portfolio_client_list(id_):
    graphs["c"].inc()
    start = time.time()
    try:
        response = list()
        client = Client.query.filter_by(id=id_).first()
        for portfolio in client.portfolios:
            response.append(parse_portfolio(portfolio))
        graphs["h"].observe(time.time() - start)
        return jsonify({"portfolios": response})
    except Exception as e:
        graphs["e"].inc()
        return str(e)


@app.route("/portfolios/advisor/<id_>")
@cross_origin()
def portfolio_advisor_list(id_):
    graphs["c"].inc()
    start = time.time()
    try:
        response = list()
        portfolios = Portfolio.query.filter(Portfolio.advisor_id == id_,
                                            Portfolio.status == 1)
        for portfolio in portfolios:
            response.append(parse_portfolio(portfolio))
        graphs["h"].observe(time.time() - start)
        return jsonify({"portfolios": response})
    except Exception as e:
        graphs["e"].inc()
        return str(e)


@app.route("/portfolio/<id_>")
@cross_origin()
def portfolio_get_by_id(id_):
    graphs["c"].inc()
    start = time.time()
    try:
        portfolio = Portfolio.query.filter_by(id=id_).first()
        response = jsonify(parse_portfolio(portfolio))
        graphs["h"].observe(time.time() - start)
        return response
    except Exception as e:
        graphs["e"].inc()
        return str(e)


@app.route("/portfolio/create", methods=["POST"])
@cross_origin()
def portfolio_create():
    graphs["c"].inc()
    start = time.time()
    try:
        portfolio_input = request.get_json()
        portfolio = Portfolio(**portfolio_input)
        db.session.add(portfolio)
        db.session.commit()
        graphs["h"].observe(time.time() - start)
        return f"New portfolio registered {portfolio.id}"
    except Exception as e:
        graphs["e"].inc()
        return str(e)


@app.route("/portfolio/update/<id_>", methods=["POST"])
@cross_origin()
def portfolio_update(id_):
    graphs["c"].inc()
    start = time.time()
    try:
        portfolio_input = request.get_json()
        portfolio = Portfolio.query.filter_by(id=id_).update(dict(**portfolio_input))
        db.session.commit()
        response = jsonify(parse_portfolio(portfolio))
        graphs["h"].observe(time.time() - start)
        return response
    except Exception as e:
        graphs["e"].inc()
        return str(e)


@app.route("/portfolio/delete/<id_>")
@cross_origin()
def portfolio_remove(id_):
    graphs["c"].inc()
    start = time.time()
    try:
        Portfolio.query.filter_by(id=id_).update(dict(status=0))
        db.session.commit()
        graphs["h"].observe(time.time() - start)
        return 1
    except Exception as e:
        graphs["e"].inc()
        return str(e)


@app.route("/portfolio/recommend", methods=["POST"])
@cross_origin()
def portfolio_recommend():
    graphs["c"].inc()
    start = time.time()
    try:
        _request = request.get_json()
        portfolio_id = int(_request.get("portfolio_id"))
        portfolio = Portfolio.query.filter_by(id=portfolio_id).first()
        client_info = []
        for _id in _request.get("client_ids", []):
            client = Client.query.filter_by(id=_id).first()
            client_info.append(client.serialize())
            client.portfolios.append(portfolio)
            db.session.add(client)
        db.session.commit()
        _portfolio = parse_portfolio(portfolio)
        import json
        send_notifications(json.dumps(_portfolio), client_info)
        graphs["h"].observe(time.time() - start)
        return "Success"
    except Exception as e:
        graphs["e"].inc()
        return str(e)


@app.route("/product/add", methods=["POST"])
@cross_origin()
def product_add():
    graphs["c"].inc()
    start = time.time()
    try:
        info = request.get_json()
        portfolio = Portfolio.query.filter_by(id=info["portfolio_id"]).first()
        for product in info.get("products", []):
            product["portfolio_id"] = info["portfolio_id"]
            p = Product(**product)
            portfolio.products.append(p)
            db.session.add(portfolio)
        db.session.commit()
        graphs["h"].observe(time.time() - start)
        return Response("Products Added")
    except Exception as e:
        graphs["e"].inc()
        return str(e)


@app.route("/portfolio/metrics", methods=["POST"])
@cross_origin()
def portfolio_metrics():
    graphs["c"].inc()
    start = time.time()
    try:
        product_input = request.get_json()
        amount = 0
        products = list()
        portfolio = Portfolio.query.filter_by(id=product_input["id"]).first()
        for p in portfolio.products:
            _p = p.serialize()
            _p.pop("portfolio_id", None)
            amount += _p.get("amount", 0)
            products.append(_p)
        metrics = get_portfolio_metrics({"start_date": product_input["start_date"],
                                         "end_date": product_input["end_date"],
                                         "amount": amount,
                                         "products": products})
        graphs["h"].observe(time.time() - start)
        return metrics
    except Exception as e:
        graphs["e"].inc()
        return str(e)


def parse_portfolio(portfolio):
    _portfolio = portfolio.serialize()
    _portfolio["products"] = [p.serialize() for p in portfolio.products]
    return _portfolio


if __name__ == "__main__":
    app.run()