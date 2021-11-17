FROM python

RUN mkdir /service
COPY publisher/ /service/publisher/
WORKDIR /service/publisher

RUN python -m pip install --upgrade pip
RUN python -m pip install -r requirements.txt

EXPOSE 8001

ENTRYPOINT [ "uvicorn", "src.main:app", "--reload", "--host=publisher_service", "--port=8001" ]
