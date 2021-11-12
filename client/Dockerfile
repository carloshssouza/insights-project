FROM python

RUN mkdir /service
COPY client/ /service/client/
WORKDIR /service/client
RUN python -m pip install --upgrade pip
RUN python -m pip install -r requirements.txt

EXPOSE 5001

ENV FLASK_APP=app.py
ENV APP_SETTINGS="config.DevelopmentConfig"
ENV DATABASE_URL="postgresql://postgres:senha_trabalho_unifei@postgres_db/insights"

ENTRYPOINT ["flask", "run", "--host=client_service", "--port=5001"]