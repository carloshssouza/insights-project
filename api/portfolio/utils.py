from __future__ import print_function
import os
import grpc
from google.protobuf.json_format import MessageToDict
from insights_pb2_grpc import MetricsStub
from insights_pb2 import PortfolioRequest
import sys
import redis

metrics_port = os.environ.get("METRICS_PORT", "9999")


def get_portfolio_metrics(payload):
    try:
        with grpc.insecure_channel(f"metrics_service:{metrics_port}") as channel:
            print(payload, file=sys.stderr)
            stub = MetricsStub(channel)
            request = PortfolioRequest(payload)
            metrics = stub.GetPortfolioMetrics(request)
            print(metrics, file=sys.stderr)
            return MessageToDict(metrics)
    except Exception as e:
        print(e, file=sys.stderr)
        raise e


def send_notifications(portfolio, emails):
    client = redis.Redis(host="localhost", port=6379)
    for email in emails:
        portfolio["email"] = email
        client.xadd("portfolio", portfolio)