from unittest import result
from src.database import Database
from src.customer import Customer
from src.department import Department
from src.project import Project


class Register:
    def __init__(self, db: Database) -> None:
        self.db = db

    def save_customer(self, customer: Customer):
        if customer.id == 0 or customer.name == "":
            return {"msg": "customer not registered missing data ( ID or Name )", "status": False}
        sql_statment = """INSERT INTO customer(name,email,password) VALUES("{name}","{email}","{password}")""".format(
            name=customer.name, email=customer.email, password=customer.password)
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

    def get_customer(self, email: str):
        if email == '':
            return {"msg": "email is empty", "status": False}
        sql_statment = """SELECT * FROM customer WHERE email="{email}" """.format(
            email=email)
        result = self.db.query(sql_statment)
        if len(result) == 0:
            return None
        return {
            "id": result[0][0],
            "email": result[0][1],
            "password": result[0][2],
            "name": result[0][3]
        }
