import os
from flask import Flask, Response
from flask_cors import CORS, cross_origin

from prometheus_client import Gauge, generate_latest
import docker
import logging


# REFERENCE
# https://www.youtube.com/watch?v=fa-bKHkF1Cs&ab_channel=ScienceGatewaysCommunityInstitute
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
app.config.from_object(os.environ["APP_SETTINGS"])
logger = logging.getLogger("app")

CONTENT_TYPE_LATEST = str("text/plain; version=0.0.4; charset=utf-8")
MBFACTOR = float(1 << 20)

memory_gauge = Gauge(
    "memory_usage_in_mb",
    "Amount of memory being used by the container",
    ["name"]
)

client = docker.from_env(version="1.23")


@app.route("/metrics", methods=["GET"])
@cross_origin()
def prometheus_metrics():
    containers = client.containers.list()
    for container in containers:
        name = container.name

        try:
            with open(f"/docker/memory/{container.id}/memory.usage_in_bytes", "r") as memfile:
                memory = memfile.read()
                memory = int(memory) / MBFACTOR
                memory_gauge.labels(name).set(memory)
        except Exception as e:
            logger.error(f"Error on memory metric update: {e}")
    return Response(generate_latest(), mimetype=CONTENT_TYPE_LATEST)


if __name__ == "__main__":
    app.run()