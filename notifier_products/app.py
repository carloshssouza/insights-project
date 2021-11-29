import smtplib
import ssl
import websocket
import os
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import jinja2
import logging
import ast
from itertools import groupby

logger = logging.getLogger("app")

source_email = os.environ.get("EMAIL", "notifygrupo02@gmail.com")
source_password = os.environ.get("PASSWORD", "senhamuitoboa")

context = ssl.create_default_context()


def render_template(template, variables):
    template_loader = jinja2.FileSystemLoader(searchpath="")
    template_env = jinja2.Environment(loader=template_loader)
    templ = template_env.get_template(template)
    return templ.render(variables)


def build_products_message(_message):
    try:
        message = MIMEMultipart("alternative")
        message['Subject'] = "Novos produtos em destaque"
        message['From'] = source_email
        message['To'] = _message[0]["email"]
        html = render_template("product_template.html", {"products": _message})
        message.attach(MIMEText(html, 'html'))
        return message
    except Exception as e:
        logger.error(e)


def send_email(messages):
    try:
        with smtplib.SMTP("smtp.gmail.com", 587) as server:
            server.starttls(context=context)
            server.login(source_email, source_password)
            for message in messages:
                email_message = build_products_message(message)
                logger.info(f"Sending products email to {message[0]['email']}")
                server.sendmail(source_email, message[0]["email"], email_message.as_string())
    except Exception as e:
        logger.error(e)


def filter_map(k):
    return k["email"]


def on_message(ws, messages):
    emails = sorted(ast.literal_eval(messages), key=filter_map)
    _messages = list()
    for key, value in groupby(emails, filter_map):
        _messages.append(list(value))
    send_email(_messages)


def on_error(ws, error):
    logger.error(f"--- Websocket Error ---\nMessage:{error}")


def on_close(ws, close_status_code, close_msg):
    logger.info(f"--- Connection Closed ---\nStatus:{close_status_code}\nMessage:{close_msg}")


if __name__ == "__main__":
    websocket.enableTrace(True)
    ws = websocket.WebSocketApp("ws://publisher_service:8001/stream/products?email=all",
                                on_message=on_message,
                                on_error=on_error,
                                on_close=on_close)

    while True:
        try:
            ws.run_forever()
        except:
            pass