FROM python

RUN mkdir /service
COPY api/portfolio/ /service/portfolio/
COPY proto/ /service/proto/
COPY api/model.py /service/portfolio/model.py
COPY api/manage.py /service/portfolio/manage.py
COPY api/config.py /service/portfolio/config.py

WORKDIR /service/portfolio
RUN python -m pip install --upgrade pip
RUN python -m pip install -r requirements.txt
RUN python -m grpc_tools.protoc -I ../proto --python_out=. \
           --grpc_python_out=. ../proto/insights.proto

EXPOSE 5004

ENV FLASK_APP=app.py
ENV APP_SETTINGS="config.DevelopmentConfig"
ENV DATABASE_URL="postgresql://postgres:senha_trabalho_unifei@postgres_db/insights"

ENTRYPOINT ["flask", "run", "--host=portfolio_service", "--port=5004"]