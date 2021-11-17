import os
import grpc
from datetime import date
from coincide_pb2 import MetricsRequest
from coincide_pb2_grpc import MetricsStub

from utils.product import Product
from sources.btg import full_btg
from sources.xp import full_xp
import json

metrics_host = os.environ.get("METRICS_HOST", "localhost")
metrics_port = os.environ.get("METRICS_PORT", "9999")


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
        _products.append(_product)
    return _products


def get_products():
    _products = list()
    _products.extend(full_btg())
    _products.extend(full_xp())
    return compose_products(_products)


if __name__ == "__main__":
    print("Starting crawler")
    with open("results.json", "w") as e:
        e.write(json.dumps(get_products(), indent=4))
