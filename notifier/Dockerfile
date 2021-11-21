FROM python:3.8-slim

RUN mkdir /service
COPY notifier/ /service/notifier/

WORKDIR /service/notifier

RUN python -m pip install --upgrade pip
RUN python -m pip install -r requirements.txt

ENTRYPOINT [ "python", "app.py" ]