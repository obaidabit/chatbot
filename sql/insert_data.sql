INSERT INTO Customer(NAME,EMAIL,PASSWORD) VALUES ("customer 1","email@test.com","password1");
INSERT INTO Customer(NAME,EMAIL,PASSWORD) VALUES ("customer 2","email2@test.com","password2");
INSERT INTO Customer(NAME,EMAIL,PASSWORD) VALUES ("customer 3","email3@test.com","password3");

INSERT INTO Department(NAME) VALUES ("Dep 1");
INSERT INTO Department(NAME) VALUES ("Dep 2");

INSERT INTO Project(NAME,TYPE,CUSTOMER_ID,DEPARTMENT_ID) VALUES ("Project 1","Mobile",1,1);
INSERT INTO Project(NAME,TYPE,CUSTOMER_ID,DEPARTMENT_ID) VALUES ("Project 2","Desktop",1,1);
INSERT INTO Project(NAME,TYPE,CUSTOMER_ID,DEPARTMENT_ID) VALUES ("Project 3","Web",1,1);
INSERT INTO Project(NAME,TYPE,CUSTOMER_ID,DEPARTMENT_ID) VALUES ("Project 4","Web",2,1);
INSERT INTO Project(NAME,TYPE,CUSTOMER_ID,DEPARTMENT_ID) VALUES ("Project 5","Tech",2,2);
INSERT INTO Project(NAME,TYPE,CUSTOMER_ID,DEPARTMENT_ID) VALUES ("Project 6","Mobile",2,1);

INSERT INTO Appointment(DATE,START_TIME,CUSTOMER_ID,DEPARTMENT_ID,PROJECT_ID) VALUES ("2021-04-09","12:00",1,1,NULL);
INSERT INTO Appointment(DATE,START_TIME,CUSTOMER_ID,DEPARTMENT_ID,PROJECT_ID) VALUES ("2021-04-09","9:00",3,2,NULL);
INSERT INTO Appointment(DATE,START_TIME,CUSTOMER_ID,DEPARTMENT_ID,PROJECT_ID) VALUES ("2022-03-13","10:00:00",1,1,NULL);
INSERT INTO Appointment(DATE,START_TIME,CUSTOMER_ID,DEPARTMENT_ID,PROJECT_ID) VALUES ("2022-04-10","2:00",2,1,4);

