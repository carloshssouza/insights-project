import os
from flask import Flask, request, jsonify

app = Flask(__name__)
app.config.from_object(os.environ["APP_SETTINGS"])

from utils.data import get_assets, list_assets


@app.route("/")
def hello():
    return {"status": 200}


@app.route("/assets")
def _list():
    try:
        assets = list_assets()
        return jsonify(assets)
    except Exception as e:
        return str(e)


@app.route("/assets/info", methods=["POST"])
def get_info():
    try:
        symbols = request.get_json().get("symbols", [])
        assets_info = get_assets(symbols, "info")
        return jsonify(assets_info)
    except Exception as e:
        return str(e)


@app.route("/assets/historic", methods=["POST"])
def get_series():
    try:
        assets_input = request.get_json()
        symbols = assets_input.get("symbols", [])
        assets_series = get_assets(symbols, "historic")
        return jsonify(assets_series)
    except Exception as e:
        return str(e)


if __name__ == "__main__":
    app.run()