FROM python

RUN mkdir /service
COPY api/collector/ /service/collector/
COPY api/config.py /service/collector/config.py

WORKDIR /service/collector

RUN apt-get update
RUN apt-get install -y libsnappy-dev
RUN python -m pip install --upgrade pip
RUN python -m pip install -r requirements.txt

EXPOSE 5005

ENV FLASK_APP=app.py
ENV APP_SETTINGS="config.DevelopmentConfig"

ENTRYPOINT ["flask", "run", "--host=collector_service", "--port=5005"]