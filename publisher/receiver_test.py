import websocket
import _thread
import time
import redis
import json


def put_mock_redis():
    email = "lucasblazzi@hotmail.com"
    mock = {
        "email": "lucasblazzi@hotmail.com",
        "stocks": {
            "segment": "Propriedades"
        },
        "funds": {
            "rating": "AA",
            "adm_tax_min": 0,
            "adm_tax_max": 0.4
          },
    }
    client = redis.Redis(host="localhost", port=6379)
    client.set(f"{{user.filter}}.{email}", json.dumps(mock))
    print(json.loads(client.get(f"{{user.filter}}.{email}")))


def on_message(ws, message):
    print("\n\n\n\nTHIS IS THE MESSAGE")
    print(json.loads(message))

def on_error(ws, error):
    print(error)

def on_close(ws, close_status_code, close_msg):
    print("### closed ###")


if __name__ == "__main__":
    # put_mock_redis()
    websocket.enableTrace(True)
    ws = websocket.WebSocketApp("ws://localhost:8001/stream/products?email=lucasblazzi@hotmail.com&past_ms=86400000",
                              on_message=on_message,
                              on_error=on_error,
                              on_close=on_close)

    ws.run_forever()