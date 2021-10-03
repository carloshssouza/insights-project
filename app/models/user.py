import uuid


class User:
    def __init__(self, profile):
        self.profile = profile

    def list_users(self, table):
        return 0

    def get_user(self, key):
        return 0

    def insert_user(self, obj, table):
        return 0

    def remove_user(self, key):
        return 0


class Client(User):
    def __init__(self, profile):
        super().__init__(profile)

    @staticmethod
    def normalize(client):
        return {
            "id": str(uuid.uuid4()),
            "cpf": int("".join([c for c in client.get("cpf") if c.isdigit()])),
            "name": client.get("name"),
            "username": client.get("username"),
            "password": client.get("password"),
            "email": client.get("email"),
            "profile": client.get("profile", "client"),
            "tel": client.get("tel", ""),
            "address": client.get("address", ""),
            "address_number": int(client.get("address_number", "")),
            "obs": client.get("obs", ""),
        }

    def list_clients(self):
        clients = self.list_users(table="insights_client")
        return clients

    def get_client(self, cnpj):
        return self.get_user(key=cnpj)

    def insert_client(self, client):
        _client = self.normalize(client)
        return self.insert_user(_client, table="insights_client")

    def remove_client(self, cnpj):
        return self.remove_user(key=cnpj)