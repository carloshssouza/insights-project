FROM python:3.8-slim

RUN mkdir /service
COPY api/monitor/ /service/monitor/
COPY api/config.py /service/monitor/config.py

WORKDIR /service/monitor
RUN python -m pip install --upgrade pip
RUN python -m pip install -r requirements.txt

EXPOSE 5006

ENV FLASK_APP=app.py
ENV APP_SETTINGS="config.DevelopmentConfig"

ENTRYPOINT ["flask", "run", "--host=monitor_service", "--port=5006"]