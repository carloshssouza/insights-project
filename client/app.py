import os
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config.from_object(os.environ["APP_SETTINGS"])
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)

from model import Client


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


if __name__ == "__main__":
    app.run()
