FROM python:3.8-slim

RUN mkdir /service
COPY dashboard/ /service/dashboard/

WORKDIR /service/dashboard

RUN python -m pip install --upgrade pip
RUN python -m pip install -r requirements.txt

EXPOSE 8501

ENTRYPOINT ["streamlit", "run", "app.py", "--server.port=8501"]