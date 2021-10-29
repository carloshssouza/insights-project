from app import db


class Client(db.Model):
    __tablename__ = "client"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String())
    cpf = db.Column(db.String())
    email = db.Column(db.String())
    cel = db.Column(db.String())
    username = db.Column(db.String())
    password = db.Column(db.String())
    suitability = db.Column(db.String())
    address = db.Column(db.String())
    complement = db.Column(db.String())
    city = db.Column(db.String())
    state = db.Column(db.String())
    zip_code = db.Column(db.String())
    obs = db.Column(db.String())
    status = db.Column(db.Integer())

    def __init__(self, cpf, name, username, password,
                 email, suitability, cel, address, city,
                 state, status, complement, zip_code, obs):
        self.cpf = cpf
        self.name = name
        self.username = username
        self.password = password
        self.email = email
        self.suitability = suitability
        self.cel = cel
        self.address = address
        self.city = city
        self.state = state
        self.status = status
        self.complement = complement
        self.zip_code = zip_code
        self.obs = obs

    def __repr__(self):
        return '<id {}>'.format(self.id)

    def serialize(self):
        return {
            "id": self.id,
            "cpf": self.cpf,
            "name": self.name,
            "username": self.username,
            "password": self.password,
            "email": self.email,
            "suitability": self.suitability,
            "cel": self.cel,
            "address": self.address,
            "city": self.city,
            "state": self.state,
            "status": self.status,
            "complement": self.complement,
            "zip_code": self.zip_code,
            "obs": self.obs,
        }
