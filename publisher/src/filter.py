import json
import logging
import ast

logger = logging.getLogger("filter")

_filter_map = {
    "Ações": "stocks",
    "Fundos Imobiliários": "realStateFunds",
    "COE": "coe",
    "Fundos de Investimento": "investmentFunds",
    "Previdência Privada": "pensionFunds"
}

send_all = [["all"], ["analytics"]]
limits = ("_max", "_min")


class Filter:
    def __init__(self, emails, redis, messages):
        self.redis = redis
        self.emails = emails
        self.messages = messages

    @property
    async def filter_products(self):
        results = list()
        emails = list()
        cur = b'0'
        if self.emails in send_all:
            while cur:
                cur, keys = await self.redis.scan(cur, match='user:*')
                if keys:
                    emails.append(keys[0].decode().split(":")[-1])
        else:
            emails = self.emails
        logger.info(emails)

        for email in emails:
            user_filter = json.loads(await self.redis.get(f"user:{email}"))
            products = ast.literal_eval(self.messages[0]["payload"].get("products", []))
            for msg in products:
                _filter_type = _filter_map[msg["category"]]
                is_desired = user_filter.get(_filter_type, False)
                if isinstance(is_desired, bool):
                    continue
                result = self.filter_data(msg, user_filter[_filter_type])
                if result:
                    result["email"] = email
                    results.append(result)
            logger.info(f"----- {len(results)} FILTRADOS PARA O EMAIL {email} -----")
        return results

    @staticmethod
    def filter_data(message, conditions):
        is_valid = True
        if not conditions:
            return message
        for key, value in conditions.items():
            if "_min" in key or "_max" in key:
                cpk = key.split("_")
                cpk.pop(-1)
                cpk = "_".join(cpk)
            else:
                cpk = key
            if cpk in message:
                logger.info(f"CAMPO: {key}")
                logger.info(f"FILTRO: {message[cpk]}")
                logger.info(f"VALOR: {value}")
                if isinstance(value, list):
                    if message[cpk] not in value:
                        is_valid = False
                        logger.info(f"[{message['name']}] não satisfeito por {key}")
                        break
                elif "_min" in key:
                    if float(message[cpk]) < float(value):
                        is_valid = False
                        logger.info(f"[{message['name']}] não satisfeito por {key}")
                        break
                elif "_max" in key:
                    if float(message[cpk]) > float(value):
                        is_valid = False
                        logger.info(f"[{message['name']}] não satisfeito por {key}")
                        break
                else:
                    if str(message[cpk]) != str(value):
                        is_valid = False
                        logger.info(f"[{message['name']}] não satisfeito por {key}")
                        break
            else:
                return None
        if is_valid:
            logger.info(f"[{message['name']}] satisfaz os filtros")
        return message if is_valid else None
