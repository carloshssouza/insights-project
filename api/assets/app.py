import os
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from data import get_assets, list_assets


app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
app.config.from_object(os.environ["APP_SETTINGS"])
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False


@app.route("/")
@cross_origin()
def hello():
    return {"status": 200}


@app.route("/assets")
@cross_origin()
def _list():
    try:
        assets = list_assets()
        return jsonify(assets)
    except Exception as e:
        return str(e)


@app.route("/assets/info", methods=["POST"])
@cross_origin()
def get_info():
    try:
        symbols = request.get_json().get("symbols", [])
        assets_info = get_assets(symbols, "info")
        return jsonify(assets_info)
    except Exception as e:
        return str(e)


@app.route("/assets/historic", methods=["POST"])
@cross_origin()
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