from datetime import datetime
from dateutil.parser import parser
from src.database import Database
from src.appointment import Appointment


class Booker:
    def __init__(self, db: Database) -> None:
        self.db = db

    def __init__(self, db_name: str) -> None:
        self.db = Database.instance(db_name)

    def _check_valid_date(self, date: str, time: str = "") -> bool:
        try:
            par = parser()
            FRIDAY = 5
            SATURDAY = 6
            date_obj = par.parse(date)
            appointment_time = None
            is_time = True
        except:
            print("Can't convert string to date")
            return False
        if date_obj.time() != par.parse("00:00:00").time():
            appointment_time = date_obj.time()
        if time != "":
            appointment_time = par.parse(time).time()

        if appointment_time:
            is_time = appointment_time.hour >= 10 and date_obj.time().hour < 5

        return (date_obj.isoweekday() != SATURDAY or date_obj.isoweekday() != FRIDAY) and is_time

    def get_appointments(self) -> tuple:
        sql_statment = """SELECT * FROM appointment WHERE date >= date('now', 'start of day') """.format(
            today=datetime.today().date())
        print(self.db.db_name)
        res = self.db.query(sql_statment)
        appointments = []
        for app in res:
            appointments.append(Appointment(
                app[0], app[1], app[2], app[3], app[4], app[5]))
        return tuple(appointments)

    def book(self, appointment: Appointment):
        if not self._check_valid_date(str(appointment.date)):
            return {"msg": "Not valid date", "status": False}

        res = self.db.query(
            f"SELECT id FROM appointment WHERE date=='{appointment.date}' AND start_time=='{appointment.start_time}'")
        if len(res) > 0:
            return {"msg": "the appointment is booked", "status": False}
        sql_statment = """INSERT INTO appointment(date,start_time,customer_id,department_id,project_id) 
        VALUES ('{date}','{start_time}',{customer_id},{department_id},{project_id})""".format(
            date=str(appointment.date),
            start_time=str(appointment.start_time),
            customer_id=appointment.customer_id,
            department_id=appointment.department_id,
            project_id=appointment.project_id
        )
        self.db.insert(sql_statment)
        return {"msg": "Appointment booked", "status": True}
