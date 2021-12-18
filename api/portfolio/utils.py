import os
import grpc
from google.protobuf.json_format import MessageToDict
from insights_pb2_grpc import MetricsStub
from insights_pb2 import PortfolioRequest, Product
import redis
import ast

metrics_port = os.environ.get("METRICS_PORT", "9999")


def message_encoder(message):
    for k, v in message.items():
        if isinstance(v, list):
            message[k] = str(v)
    return message


def build_request(payload):
    request = PortfolioRequest()
    request.start_date = payload["start_date"]
    request.end_date = payload["end_date"]
    request.amount = float(payload["amount"])
    for p in payload.get("products", []):
        product = request.products.add()
        product.id = p["id"]
        product.proportion = float(p["proportion"])
        product.amount = float(p["amount"])
    return request


def get_portfolio_metrics(payload):
    try:
        with grpc.insecure_channel(f"metrics_service:{metrics_port}") as channel:
            stub = MetricsStub(channel)
            request = build_request(payload)
            metrics = stub.GetPortfolioMetrics(request)
            return MessageToDict(metrics)
    except Exception as e:
        raise e


def send_notifications(portfolio, clients):
    try:
        client = redis.Redis(host="redis_db", port=6379)
        _portfolio = ast.literal_eval(portfolio)
        for c in clients:
            _portfolio["email"] = c["email"]
            _portfolio["name"] = c["name"]
            client.xadd("portfolio", message_encoder(_portfolio))
    except Exception as e:
        raise e

