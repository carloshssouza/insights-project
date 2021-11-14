FROM python

RUN mkdir /service
COPY api/client/ /service/client/
COPY api/model.py /service/client/model.py
COPY api/manage.py /service/client/manage.py
COPY api/config.py /service/client/config.py

WORKDIR /service/client
RUN python -m pip install --upgrade pip
RUN python -m pip install -r requirements.txt

EXPOSE 5001

ENV FLASK_APP=app.py
ENV APP_SETTINGS="config.DevelopmentConfig"
ENV DATABASE_URL="postgresql://postgres:senha_trabalho_unifei@postgres_db/insights"

ENTRYPOINT ["flask", "run", "--host=client_service", "--port=5001"]