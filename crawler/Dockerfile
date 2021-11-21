FROM python

RUN mkdir /service
COPY proto/ /service/proto/
COPY crawler/ /service/crawler/

WORKDIR /service/crawler

RUN python -m pip install --upgrade pip
RUN python -m pip install -r requirements.txt
RUN python -m grpc_tools.protoc -I ../proto --python_out=. \
           --grpc_python_out=. ../proto/insights.proto

ENV FLASK_APP=app.py

EXPOSE 10101
ENTRYPOINT ["flask", "run", "--host=crawler_service", "--port=10101"]