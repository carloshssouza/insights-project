import smtplib, ssl
import websocket
import json
import os

source_email = os.environ.get("EMAIL", "notifygrupo02@gmail.com")
source_password = os.environ.get("PASSWORD", "8888")

context = ssl.create_default_context()

def build_body(message):
    products = ""
    for p in message["products"]:
        products += f"Ativo: {p['id'].split('.')[0]}\tValor aplicado: R${str(p['amount'])}" \
                    f"\tProporção na carteira: {str(p['proportion']*100)}%"
    return "Subject: Nova proposta de carteira.\n" \
           "Seu assessor acabar de propor uma nova carteira de investimentos\n" \
           f"Nome: {message['name']}\n" \
           f"Valor total da aplicação: {message['amount']}\n" \
           f"{products}"

def send_email(messages):
    with smtplib.SMTP("smtp.gmail.com", port=587) as server:
        # server.ehlo()
        server.starttls(context=context)
        # server.ehlo()
        server.login(source_email, source_password)
        for message in messages:
            receiver_email = message["email"]
            body = build_body(message)
        server.sendmail(source_email, receiver_email, body)



def on_message(ws, messages):
    messages = json.loads(messages)
    send_email(messages)


def on_error(ws, error):
    print(f"--- Websocket Error ---\nMessage:{error}")

def on_close(ws, close_status_code, close_msg):
    print(f"--- Connection Closed ---\nStatus:{close_status_code}\nMessage:{close_msg}")


if __name__ == "__main__":
    websocket.enableTrace(True)
    ws = websocket.WebSocketApp("ws://localhost:8001/stream/products",
                                on_message=on_message,
                                on_error=on_error,
                                on_close=on_close)

    ws.run_forever()