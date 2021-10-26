import os
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

app.config.from_object(os.environ['APP_SETTINGS'])
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

from models import Client


@app.route("/")
def hello():
    return "Hello World!"


@app.route("/client/register")
def add_client():
    try:
        client = Client(
            cnpj=request.args.get('cnpj'),
            name=request.args.get('name'),
            username=request.args.get('username'),
            password=request.args.get('password'),
            email=request.args.get('email'),
            profile=request.args.get('profile'),
            tel=request.args.get('tel'),
            address=request.args.get('address'),
            city=request.args.get('city'),
            state=request.args.get('state'),
            status=request.args.get('status'),
        )
        db.session.add(client)
        db.session.commit()
        return f"New client registered {client.id}"
    except Exception as e:
        return str(e)


@app.route("/clients")
def get_all():
    try:
        clients = Client.query.all()
        return jsonify([e.serialize() for e in clients])
    except Exception as e:
        return str(e)


@app.route("/clients/<id_>")
def get_by_id(id_):
    try:
        client = Client.query.filter_by(id=id_).first()
        return jsonify(client.serialize())
    except Exception as e:
        return str(e)


if __name__ == '__main__':
    app.run()