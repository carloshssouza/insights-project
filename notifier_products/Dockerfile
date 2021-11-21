FROM python:3.8-slim

RUN mkdir /service
COPY notifier_products/ /service/notifier_products/

WORKDIR /service/notifier_products

RUN python -m pip install --upgrade pip
RUN python -m pip install -r requirements.txt

ENTRYPOINT [ "python", "app.py" ]