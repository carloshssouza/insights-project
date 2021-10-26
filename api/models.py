from app import db


class Client(db.Model):
    __tablename__ = "client"

    id = db.Column(db.Integer, primary_key=True)
    cnpj = db.Column(db.String())
    name = db.Column(db.String())
    username = db.Column(db.String())
    password = db.Column(db.String())
    email = db.Column(db.String())
    profile = db.Column(db.String())
    tel = db.Column(db.String())
    address = db.Column(db.String())
    city = db.Column(db.String())
    state = db.Column(db.String())
    status = db.Column(db.Integer())

    def __init__(self, cnpj, name, username, password, email, profile, tel, address, city, state, status):
        self.cnpj = cnpj
        self.name = name
        self.username = username
        self.password = password
        self.email = email
        self.profile = profile
        self.tel = tel
        self.address = address
        self.city = city
        self.state = state
        self.status = status

    def __repr__(self):
        return '<id {}>'.format(self.id)

    def serialize(self):
        return {
            "id": self.id,
            "cpf": self.cnpj,
            "name": self.name,
            "username": self.username,
            "password": self.password,
            "email": self.email,
            "profile": self.profile,
            "tel": self.tel,
            "address": self.address,
            "city": self.city,
            "state": self.state,
            "status": self.status
        }
