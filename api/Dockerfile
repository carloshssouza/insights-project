FROM python

RUN mkdir /service
COPY api/ /service/api/
WORKDIR /service/api
RUN python -m pip install --upgrade pip
RUN python -m pip install -r requirements.txt

EXPOSE 5000

ENV FLASK_APP=app.py
ENV APP_SETTINGS="config.DevelopmentConfig"
ENV DATABASE_URL="postgresql://postgres:senha_trabalho_unifei@postgres_db/insights"

ENTRYPOINT ["flask", "run", "--host=0.0.0.0"]