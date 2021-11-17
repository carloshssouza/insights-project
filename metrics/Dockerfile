FROM python

RUN mkdir /service
COPY proto/ /service/proto/
COPY metrics/ /service/metrics/

WORKDIR /service/metrics

RUN python -m pip install --upgrade pip
RUN python -m pip install -r requirements.txt
RUN python -m grpc_tools.protoc -I ../proto --python_out=. \
           --grpc_python_out=. ../proto/insights.proto

EXPOSE 9999

ENTRYPOINT [ "python", "-u", "app.py" ]