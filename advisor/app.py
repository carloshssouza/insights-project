import os
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config.from_object(os.environ["APP_SETTINGS"])
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)

from model import Advisor


@app.route("/")
def hello():
    return {"status": 200}


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