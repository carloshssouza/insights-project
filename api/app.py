import os
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config.from_object(os.environ["APP_SETTINGS"])
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)

from models.client import Client
from models.advisor import Advisor


@app.route("/")
def hello():
    return {"status": 200}


@app.route("/clients")
def client_list():
    try:
        clients = Client.query.filter_by(status=1).all()
        return jsonify([e.serialize() for e in clients])
    except Exception as e:
        return str(e)


@app.route("/client/<id_>")
def client_get_by_id(id_):
    try:
        client = Client.query.filter_by(id=id_).first()
        return jsonify(client.serialize())
    except Exception as e:
        return str(e)


@app.route("/client/create", methods=["POST"])
def client_create():
    try:
        client_input = request.get_json()
        client = Client(**client_input)
        db.session.add(client)
        db.session.commit()
        return f"New client registered {client.id}"
    except Exception as e:
        return str(e)


@app.route("/client/update/<id_>", methods=["POST"])
def client_update(id_):
    try:
        client_input = request.get_json()
        client = Client.query.filter_by(id=id_).update(dict(**client_input))
        db.session.commit()
        return jsonify(client)
    except Exception as e:
        return str(e)


@app.route("/client/delete/<id_>", methods=["GET"])
def client_remove(id_):
    try:
        client = Client.query.filter_by(id=id_).update(dict(status=0))
        db.session.commit()
        return jsonify(client)
    except Exception as e:
        return str(e)


@app.route("/advisors")
def advisor_list():
    try:
        advisors = Advisor.query.filter_by(status=1).all()
        return jsonify([e.serialize() for e in advisors])
    except Exception as e:
        return str(e)


@app.route("/advisor/<id_>")
def advisor_get_by_id(id_):
    try:
        advisor = Advisor.query.filter_by(id=id_).first()
        return jsonify(advisor.serialize())
    except Exception as e:
        return str(e)


@app.route("/advisor/create", methods=["POST"])
def advisor_create():
    try:
        advisor_input = request.get_json()
        advisor = Advisor(**advisor_input)
        db.session.add(advisor)
        db.session.commit()
        return f"New advisor registered {advisor.id}"
    except Exception as e:
        return str(e)


@app.route("/advisor/update/<id_>", methods=["POST"])
def advisor_update(id_):
    try:
        advisor_input = request.get_json()
        advisor = Advisor.query.filter_by(id=id_).update(dict(**advisor_input))
        db.session.commit()
        return jsonify(advisor)
    except Exception as e:
        return str(e)


@app.route("/advisor/delete/<id_>", methods=["GET"])
def advisor_remove(id_):
    try:
        advisor = Advisor.query.filter_by(id=id_).update(dict(status=0))
        db.session.commit()
        return jsonify(advisor)
    except Exception as e:
        return str(e)


if __name__ == "__main__":
    app.run()