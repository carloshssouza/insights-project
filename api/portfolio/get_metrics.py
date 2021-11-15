import os
import grpc
from google.protobuf.json_format import MessageToDict
from insights_pb2_grpc import MetricsStub
from insights_pb2 import PortfolioRequest
import logging

logging.basicConfig(filename="error.log", level=logging.DEBUG)
metrics_port = os.environ.get("METRICS_PORT", "9999")


def get_portfolio_metrics(payload):
    try:
        with grpc.insecure_channel(f"metrics_service:{metrics_port}") as channel:
            stub = MetricsStub(channel)
            request = PortfolioRequest(payload)
            logging.debug(f"Request {request}")
            metrics = stub.GetPortfolioMetrics(request)
            return MessageToDict(metrics)
    except Exception as e:
        logging.debug(f"Error {e}")
        raise e
