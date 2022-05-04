class Customer:
    def __init__(self, id: int, name: str, email: str, password: str) -> None:
        self.id = id
        self.name = name
        self.email = email
        self.password = password

    def toDict(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "password": self.password
        }
