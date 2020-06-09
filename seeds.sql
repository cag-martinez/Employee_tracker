USE employeeTracker_db;

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Robert", "Williams", 12345, 54321), ("Thomas", "Regins", 12345, 55321), ("Mariam", "Reynolds", 12345, 54321);

SELECT * FROM employee;

INSERT INTO role (title, salary, department_id)
VALUES ("Developer", 80000.000, 73730), ("Designer", 80000.00, 74740), ("Content creator", 85000.00, 77880);

SELECT * FROM role;

INSERT INTO department (name)
VALUES ("Tech"), ("Tech"), ("Tech");

SELECT * FROM department;