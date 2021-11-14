FROM python

RUN mkdir /service
COPY api/assets/ /service/assets/

WORKDIR /service/assets
RUN python -m pip install --upgrade pip
RUN python -m pip install -r requirements.txt

EXPOSE 5003

ENV FLASK_APP=app.py
ENV APP_SETTINGS="config.DevelopmentConfig"

ENTRYPOINT ["flask", "run", "--host=assets_service", "--port=5003"]