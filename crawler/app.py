import os
import grpc
from datetime import date
from flask import Flask, jsonify
from insights_pb2 import MetricsRequest
from insights_pb2_grpc import MetricsStub

from utils.product import Product
from sources.btg import full_btg
from sources.xp import full_xp
import redis
import logging

logger = logging.getLogger("app")

metrics_host = os.environ.get("METRICS_HOST", "metrics_service")
metrics_port = os.environ.get("METRICS_PORT", "9999")
app = Flask(__name__)


def get_metrics(ticker):
    try:
        with grpc.insecure_channel(f"{metrics_host}:{metrics_port}") as channel:
            stub = MetricsStub(channel)
            request = MetricsRequest(base_date=date.today().strftime("%Y-%m-%d"), ticker=ticker)
            metrics = stub.GetMetrics(request)
            return metrics
    except Exception as e:
        raise e


def compose_products(products: list) -> list:
    _products = list()
    calculate = ("Ações", "Fundos Imobiliários")
    for product in products:
        _product = Product(product).compose_product
        if _product["category"] in calculate:
            metrics = get_metrics(_product["ticker"])
            if metrics.ByteSize():
                p_metrics = {x.name: x.value for x in metrics.metrics}
                _product = _product | p_metrics
                _product["name"] = metrics.name or _product["name"] or _product["ticker"]
        logger.info(f"Crawled: {_product['name']}")
        _products.append(_product)
    return _products


def get_products():
    _products = list()
    _products.extend(full_btg())
    _products.extend(full_xp())
    return compose_products(_products)


def publish_products():
    products = get_products()
    import json
    client = redis.Redis(host="redis_db", port=6379)
    client.delete("user:leblazzi@hotmail.com")
    mock = {
        "email": "lucasblazzi@hotmail.com",
        "stocks": {
            "segment": ["Propriedades", "Agronegócio", "Varejo"]
        },
        "funds": {
            "adm_tax_min": 0,
            "adm_tax_max": 0.4
          },
        "real_state": {
            "segment": ["Lajes corporativas", "Logístico"],
            "dividend_yield_min": 0.001
        },
        "coe": {
            "classifcation": "Rating AAA(bra)"
        }
    }
    client.set(f"user:lucasblazzi@hotmail.com", json.dumps(mock))
    client.xadd("products", {"products": str(products)})
    return products


@app.route("/")
def hello():
    products = publish_products()
    return jsonify({"status": 200, "message": "Crawler Ended", "products": products})

