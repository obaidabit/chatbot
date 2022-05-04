class Department:
    def __init__(self, id: int, name: str) -> None:
        self.id = id
        self.name = name

    def toDict(self):
        return {
            "id": self.id,
            "name": self.name
        }
