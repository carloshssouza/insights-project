FROM python

RUN mkdir /service
COPY api/ /service/api/
WORKDIR /service/api
RUN python -m pip install --upgrade pip
RUN python -m pip install -r requirements.txt

EXPOSE 6003

ENV FLASK_APP=app.py
ENV APP_SETTINGS="config.DevelopmentConfig"

ENTRYPOINT ["flask", "run", "--host=0.0.0.0", "--port=6003"]