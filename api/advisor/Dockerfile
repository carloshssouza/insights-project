FROM python

RUN mkdir /service
COPY api/advisor/ /service/advisor/
COPY api/model.py /service/advisor/model.py
COPY api/manage.py /service/advisor/manage.py
COPY api/config.py /service/advisor/config.py

WORKDIR /service/advisor
RUN python -m pip install --upgrade pip
RUN python -m pip install -r requirements.txt

EXPOSE 5002

ENV FLASK_APP=app.py
ENV APP_SETTINGS="config.DevelopmentConfig"
ENV DATABASE_URL="postgresql://postgres:senha_trabalho_unifei@postgres_db/insights"

ENTRYPOINT ["flask", "run", "--host=advisor_service", "--port=5002"]