import json

_filter_map = {
    "Ações": "stocks",
    "Fundos Imobiliários": "real_state",
    "COE": "coe",
    "Fundos de Investimento": "funds",
    "Previdência Privada": "pension_funds"
}


class Filter:
    def __init__(self, email, redis, messages):
        self.redis = redis
        self.email = email
        self.messages = messages

    @property
    async def filter_products(self):
        user_filter = json.loads(await self.redis.get(f"{{user.filter}}.{self.email}"))
        results = list()
        for msg in self.messages:
            _filter_type = _filter_map[msg["payload"]["category"]]
            is_desired = user_filter.get(_filter_type)
            if not is_desired:
                continue
            result = self.filter_data(msg["payload"], user_filter[_filter_type])
            result["email"] = self.email
            if result:
                results.append(result)
        return results

    @staticmethod
    def filter_data(message, conditions):
        is_valid = True
        for key, value in conditions.items():
            if key in message:
                if "min" in key:
                    if float(message[key]) < conditions[key]:
                        is_valid = False
                        break
                elif "max" in key:
                    if float(message[key]) > conditions[key]:
                        is_valid = False
                        break
                else:
                    if message[key] != conditions[key]:
                        is_valid = False
                        break

        return message if is_valid else None
