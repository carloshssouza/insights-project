import os
import grpc
from google.protobuf.json_format import MessageToDict
from insights_pb2_grpc import MetricsStub
from insights_pb2 import PortfolioRequest, PortfolioResponse


metrics_host = os.environ.get("METRICS_HOST", "localhost")
metrics_port = os.environ.get("METRICS_PORT", "9999")


def get_portfolio_metrics(payload):
    try:
        with grpc.insecure_channel(f"{metrics_host}:{metrics_port}") as channel:
            stub = MetricsStub(channel)
            request = PortfolioRequest(payload)
            metrics = stub.GetPortfolioMetrics(request)
            return MessageToDict(metrics)
    except Exception as e:
        raise e