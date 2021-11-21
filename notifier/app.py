import smtplib
import ssl
import websocket
import json
import os
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import jinja2
import logging
import ast


logger = logging.getLogger("app")

source_email = os.environ.get("EMAIL", "notifygrupo02@gmail.com")
source_password = os.environ.get("PASSWORD", "senhamuitoboa")

context = ssl.create_default_context()


def build_body(message):
    products = ""
    for p in message["products"]:
        products += f"Asset: {p['id'].split('.')[0]}\tTotal Value: R${str(p['amount'])}" \
                    f"\tPortfolio proportion: {str(p['proportion']*100)}%\n"
    return "Subject: New proposed portfolio\n" \
           "Your investment advisor just proposed a new portfolio.\n" \
           f"Name: {message['name']}\n" \
           f"Total Application Value: {message['amount']}\n" \
           f"{products}"


def render_template(template, variables):
    template_loader = jinja2.FileSystemLoader(searchpath="")
    template_env = jinja2.Environment(loader=template_loader)
    templ = template_env.get_template(template)
    return templ.render(variables)


def parse_portfolio(message):
    message["products"] = ast.literal_eval(message["products"])
    for p in message["products"]:
        p["proportion"] = f"{str(p['proportion']*100)}%"
        p["amount"] = f"R${str(p['amount'])},00"
        p["id"] = p['id'].split('.')[0]
    return message


def build_email_message(_message):
    try:
        _message = parse_portfolio(_message)
        message = MIMEMultipart("alternative")
        message['Subject'] = "New proposed portfolio"
        message['From'] = source_email
        message['To'] = _message["email"]
        html = render_template("portfolio_template.html", {"name": _message["name"], "products": _message["products"]})
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
                email_message = build_email_message(message)
                logger.info(f"Sending portfolio proposition email to {message['email']}")
                server.sendmail(source_email, message["email"], email_message.as_string())
    except Exception as e:
        logger.error(e)


def on_message(ws, messages):
    messages = json.loads(messages)
    send_email(messages)


def on_error(ws, error):
    print(f"--- Websocket Error ---\nMessage:{error}")


def on_close(ws, close_status_code, close_msg):
    print(f"--- Connection Closed ---\nStatus:{close_status_code}\nMessage:{close_msg}")


if __name__ == "__main__":
    websocket.enableTrace(True)
    ws = websocket.WebSocketApp("ws://publisher_service:8001/stream/portfolio",
                                on_message=on_message,
                                on_error=on_error,
                                on_close=on_close)


    while True:
        try:
            ws.run_forever()
        except:
            pass