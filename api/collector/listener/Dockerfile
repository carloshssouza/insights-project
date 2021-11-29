FROM python

RUN mkdir /service
COPY api/collector/ /service/collector/

WORKDIR /service/collector

RUN python -m pip install --upgrade pip
RUN python -m pip install -r requirements.txt

EXPOSE 9918

ENTRYPOINT ["python", "listener/app.py"]