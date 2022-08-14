CREATE TABLE Customer(
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    name TEXT NOT NULL
);
CREATE TABLE Department(
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
);
CREATE TABLE Appointment(
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    date TEXT NOT NULL,
    start_time TEXT NOT NULL,
    customer_id INTEGER NOT NULL,
    department_id INTEGER NOT NULL ,
    project_id INTEGER NULL,
    FOREIGN KEY(customer_id) REFERENCES Customer(id),
    FOREIGN KEY(department_id) REFERENCES Department(id),
    FOREIGN KEY(project_id) REFERENCES Project(id)
);
CREATE TABLE Project(
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    customer_id INTEGER NOT NULL,
    department_id INTEGER NOT NULL,
    FOREIGN KEY(customer_id) REFERENCES Customer(id),
    FOREIGN KEY(department_id) REFERENCES Department(id)
);

