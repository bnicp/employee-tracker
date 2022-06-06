INSERT INTO department (name)
VALUES ('IT'),
       ('Marketing'),
       ('Customer Service'),
       ('Sales'),
       ('Risk Management');

INSERT INTO roles (title, salary, department_id)
VALUES ('IT Manager', 65000, 1),
       ('Marketing Associate', 53000, 2),
       ('Customer Service Representative', 42000, 3),
       ('Sales Rep', 71000, 4),
       ('Risk Analyst', 56000, 5);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ('Harry', 'Potter', 1),
       ('Ronald', 'Weasley', 2),
       ('Hermoine', 'Grangier', 3),
       ('Draco', 'Malfoy', 4),
       ('Sirius', 'Black', 5);

UPDATE employee SET manager_id = 1 WHERE id >= 2;