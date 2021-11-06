from app import db


class Advisor(db.Model):
    __tablename__ = "advisor"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String())
    cpf = db.Column(db.String())
    email = db.Column(db.String())
    cel = db.Column(db.String())
    username = db.Column(db.String())
    password = db.Column(db.String())
    address = db.Column(db.String())
    complement = db.Column(db.String())
    city = db.Column(db.String())
    state = db.Column(db.String())
    zip_code = db.Column(db.String())
    obs = db.Column(db.String())
    birth = db.Column(db.String())
    salary = db.Column(db.Float())
    work_code = db.Column(db.Integer())
    cvm_code = db.Column(db.String())
    status = db.Column(db.Integer())

    def __init__(self, cpf, name, username, password,
                 email, cel, address, city, state, status,
                 complement, zip_code, obs, birth, salary,
                 work_code, cvm_code):
        self.cpf = cpf
        self.name = name
        self.username = username
        self.password = password
        self.email = email
        self.cel = cel
        self.address = address
        self.city = city
        self.state = state
        self.status = status
        self.complement = complement
        self.zip_code = zip_code
        self.obs = obs
        self.birth = birth
        self.salary = salary
        self.work_code = work_code
        self.cvm_code = cvm_code

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
            "cel": self.cel,
            "address": self.address,
            "city": self.city,
            "state": self.state,
            "status": self.status,
            "complement": self.complement,
            "zip_code": self.zip_code,
            "obs": self.obs,
            "birth": self.birth,
            "salary": self.salary,
            "work_code": self.work_code,
            "cvm_code": self.cvm_code,
        }
