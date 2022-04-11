class Project:
    def __init__(self, id: int, name: str, type: str, customer_id: int, department_id: int) -> None:
        self.id = id
        self.name = name
        self.type = type
        self.customer_id = customer_id
        self.department_id = department_id
