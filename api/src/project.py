class Project:
    def __init__(self, id: int, name: str, type: str, customer_id: int, department_id: int) -> None:
        self.id = id
        self.name = name
        self.type = type
        self.customer_id = customer_id
        self.department_id = department_id

    def toDict(self):
        return {
            "id": self.id,
            "name": self.name,
            "type": self.type,
            "customer_id": self.customer_id,
            "department_id": self.department_id
        }
