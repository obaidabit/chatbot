import sqlite3
from sqlite3 import Error


class Database:
    _instance = None

    def __init__(self) -> None:
        raise RuntimeError("Call instance() method instead")

    @classmethod
    def instance(cls, db_name: str):
        if cls._instance == None:
            cls._instance = cls.__new__(cls)
            cls._setup_database(cls, db_name)
        return cls._instance

    def _setup_database(self, db_name: str) -> None:
        self.db_name = db_name
        try:
            self.conn = sqlite3.connect(db_name, check_same_thread=False)
            self._create_tables_(self)
            self._insert_data_(self)
        except Error as e:
            print(e)
            print('SQLite error: %s' % (' '.join(e.args)))
            self.conn.close()

    def _create_tables_(self) -> None:
        sql_statment = ''
        with open("sql/create_tables.sql", 'r') as file:
            sql_statment = file.read()
        self.conn.executescript(sql_statment)
        self.conn.commit()

    def _insert_data_(self) -> None:
        sql_statment = ''
        with open("sql/insert_data.sql", 'r') as file:
            sql_statment = file.read()
        self.conn.executescript(sql_statment)
        self.conn.commit()

    def insert(self, sql_statment) -> None:
        try:
            self.conn.execute(sql_statment)
            self.conn.commit()
        except Error:
            print("SQL ERROR : Could not insert values")
            print('SQLite error: %s' % (' '.join(Error.args)))

    def query(self, sql_statment: str) -> list:
        try:
            cur = self.conn.execute(sql_statment)
            return cur.fetchall()
        except Error:
            print("SQL ERROR: Could not query")
            print('SQLite error: %s' % (' '.join(Error.args)))
