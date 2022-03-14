from database import Database
from customer import Customer
from department import Department
from project import Project


class Register:
    def __init__(self, db: Database) -> None:
        self.db = db

    def save_customer(self, customer: Customer):
        if customer.id == 0 or customer.name == "":
            return {"msg": "customer not registered missing data ( ID or Name)", "status": False}
        sql_statment = "INSERT INTO customer(name) VALUES({name})".format(
            name=customer.name)
        self.db.insert(sql_statment)
        return {"msg": "customer registered", "status": True}

    def save_department(self, department: Department):
        if department.id == 0 or department.name == "":
            return {"msg": "department not registered missing data ( ID or Name)", "status": False}
        sql_statment = "INSERT INTO department(name) VALUES({name})".format(
            name=department.name)
        self.db.insert(sql_statment)
        return {"msg": "department registered", "status": True}

    def save_project(self, project: Project):
        if project.id == 0 or project.name == "":
            return {"msg": "project not registered missing data", "status": False}
        sql_statment = "INSERT INTO project(name) VALUES({name},{type},{customer_id},{department_id})".format(
            name=project.name, type=project.type, customer_id=project.customer_id, department_id=project.department_id)
        self.db.insert(sql_statment)
        return {"msg": "project registered", "status": True}
