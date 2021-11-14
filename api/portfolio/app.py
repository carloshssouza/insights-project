import os
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
app.config.from_object(os.environ["APP_SETTINGS"])
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)

from model import Portfolio, Product, Client
#from portfolio.get_metrics import get_portfolio_metrics


@app.route("/")
@cross_origin()
def hello():
    return {"status": 200}


@app.route("/portfolios/<id_>")
@cross_origin()
def portfolio_list(id_):
    try:
        results = list()
        portfolios = Client.query.filter_by(id=id_).first().portfolios
        for portfolio in portfolios:
            parsed = portfolio.serialize()
            parsed["products"] = [p.serialize() for p in portfolio.products]
            results.append(parsed)
        return jsonify(results)
    except Exception as e:
        return str(e)


@app.route("/portfolio/<id_>")
@cross_origin()
def portfolio_get_by_id(id_):
    try:
        portfolio = Portfolio.query.filter_by(id=id_).first()
        _portfolio = portfolio.serialize()
        _portfolio["products"] = [p.serialize() for p in portfolio.products]
        return jsonify(_portfolio)
    except Exception as e:
        return str(e)


@app.route("/portfolio/create", methods=["POST"])
@cross_origin()
def portfolio_create():
    try:
        portfolio_input = request.get_json()
        portfolio = Portfolio(**portfolio_input)
        db.session.add(portfolio)
        db.session.commit()
        return f"New portfolio registered {portfolio.id}"
    except Exception as e:
        return str(e)


@app.route("/portfolio/update/<id_>", methods=["POST"])
@cross_origin()
def portfolio_update(id_):
    try:
        portfolio_input = request.get_json()
        portfolio = Portfolio.query.filter_by(id=id_).update(dict(**portfolio_input))
        db.session.commit()
        return jsonify(portfolio)
    except Exception as e:
        return str(e)


@app.route("/portfolio/delete/<id_>")
@cross_origin()
def portfolio_remove(id_):
    try:
        portfolio = Portfolio.query.filter_by(id=id_).update(dict(status=0))
        db.session.commit()
        return jsonify(portfolio)
    except Exception as e:
        return str(e)


@app.route("/product/add", methods=["POST"])
@cross_origin()
def product_add():
    try:
        info = request.get_json()
        portfolio = Portfolio.query.filter_by(id=info["portfolio_id"]).first()
        for product in info.get("products", []):
            product["portfolio_id"] = info["portfolio_id"]
            p = Product(**product)
            portfolio.products.append(p)
            db.session.add(portfolio)
        db.session.commit()
        return "Products Added"
    except Exception as e:
        return str(e)


@app.route("/portfolio/metrics", method=["POST"])
def portfolio_get_by_id():
    try:
        product_input = request.get_json()
        portfolio = Portfolio.query.filter_by(id=product_input["id"]).first()
        products = [p.serialize() for p in portfolio.products]
        metrics = get_portfolio_metrics({"start_date": product_input["end_date"],
                                         "end_date": product_input["end_date"],
                                         "products": products})
        return metrics
    except Exception as e:
        return str(e)

if __name__ == "__main__":
    app.run()