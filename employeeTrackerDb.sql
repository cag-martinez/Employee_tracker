DROP DATABASE IF EXISTS employeeTracker_db;

CREATE DATABASE employeeTracker_db;

USE employeeTracker_db;

CREATE TABLE employee (
id INTEGER NOT NULL AUTO_INCREMENT,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INTEGER NOT NULL,
manager_id INTEGER NOT NULL,
PRIMARY KEY (id)
);

CREATE TABLE role (
id INTEGER NOT NULL AUTO_INCREMENT,
title VARCHAR(30) NOT NULL,
salary DECIMAL (10, 2) NOT NULL,
department_id INTEGER NOT NULL,
PRIMARY KEY (id)
);

CREATE TABLE department (
id INTEGER NOT NULL AUTO_INCREMENT,
name VARCHAR(30) NOT NULL,
PRIMARY KEY (id)
);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Robert", "Williams", 12345, 54321), ("Thomas", "Regins", 12345, 55321), ("Mariam", "Reynolds", 12345, 54321);

SELECT * FROM employee;

INSERT INTO role (title, salary, department_id)
VALUES ("Developer", 80000.000, 73730), ("Designer", 80000.00, 74740), ("Content creator", 85000.00, 77880);

SELECT * FROM role;

INSERT INTO department (name)
VALUES ("Tech"), ("Tech"), ("Tech");

SELECT * FROM department;