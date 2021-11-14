from app import db
from sqlalchemy.orm import relationship


PortfolioClient = db.Table('portfolio_client',
                           db.Column('client_id', db.Integer(), db.ForeignKey('client.id')),
                           db.Column('portfolio_id', db.Integer(), db.ForeignKey('portfolio.id')))


class Portfolio(db.Model):
    __tablename__ = "portfolio"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String())
    amount = db.Column(db.Float())
    status = db.Column(db.Integer())
    advisor_id = db.Column(db.Integer(), db.ForeignKey("advisor.id"))
    products = db.relationship("Product", backref="portfolio")

    def __init__(self, name, amount, status,
                 advisor_id, products):
        self.name = name
        self.amount = amount
        self.status = status
        self.advisor_id = advisor_id
        self.products = products

    def __repr__(self):
        return '<id {}>'.format(self.id)

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "amount": self.amount,
            "status": self.status,
            "advisor_id": self.advisor_id,
            "products": self.products
        }


class Product(db.Model):
    __tablename__ = "product"

    id = db.Column(db.String(), primary_key=True)
    amount = db.Column(db.Float())
    proportion = db.Column(db.Float())
    portfolio_id = db.Column(db.String(), db.ForeignKey("portfolio.id"))

    def __init__(self, id, amount, proportion,
                 portfolio_id):
        self.id = id
        self.amount = amount
        self.proportion = proportion
        self.portfolio_id = portfolio_id

    def __repr__(self):
        return '<id {}>'.format(self.id)

    def serialize(self):
        return {
            "id": self.id,
            "amount": self.amount,
            "proportion": self.proportion,
            "portfolio_id": self.portfolio_id,
        }


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
    advisor_id = db.Column(db.String, db.ForeignKey("advisor.id"))
    portfolios = relationship('Portfolio', secondary=PortfolioClient, backref='portfolio')

    def __init__(self, cpf, name, username, password,
                 email, suitability, cel, address, city,
                 state, status, complement, zip_code, obs, advisor_id, portfolios):
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
        self.advisor_id = advisor_id
        self.portfolios = portfolios

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
            "advisor_id": self.advisor_id,
            "portfolios": self.portfolios
        }


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
    portfolios = db.relationship("Portfolio", backref="owner")

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
