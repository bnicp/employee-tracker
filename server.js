const connection = require("./config/connection");
const inquirer = require("inquirer");
const conTable = require("console.table");

// Prompt User for Choices
const runEmployeeDB = () => {
  inquirer
    .prompt([
      {
        name: "choices",
        type: "list",
        message: "Please select an option:",
        choices: [
          "View All Departments",
          "View All Roles",
          "View All Employees",
          "Add a Department",
          "Add a Role",
          "Add an Employee",
          "Update an Employee Role",
          "Exit",
        ],
      },
    ])
    .then((answers) => {
      const { choices } = answers;

      if (choices === "View All Departments") {
        viewAllDepartments();
      }

      if (choices === "View All Roles") {
        viewAllRoles();
      }

      if (choices === "View All Employees") {
        viewAllEmployees();
      }

      if (choices === "Add a Role") {
        addRole();
      }

      if (choices === "Add a Department") {
        addDepartment();
      }

      if (choices === "Add an Employee") {
        addEmployee();
      }

      if (choices === "Update an Employee Role") {
        updateEmployeeRole();
      }
      if (choices === "Exit") {
        connection.end();
      }
    });
};

// View All Departments
function viewAllDepartments() {
    connection.query("SELECT department.id AS ID, department.name AS Department FROM department",
    function(err, res) {
      if (err) throw err
      console.log("")
      console.log("ALL DEPARTMENTS")
      console.log("")
      console.table(res)
      runEmployeeDB()
  })
}

// View All Roles
function viewAllRoles() {
    connection.query("SELECT role.id AS Dept_ID, role.title AS Title FROM role",
    function(err, res) {
      if (err) throw err
      console.log("")
      console.log("*** ROLE LIST ***")
      console.log("")
      console.table(res)
      runEmployeeDB()
  })
}

// View All Employees
function viewAllEmployees() {
    
    connection.query("SELECT employees.firstName AS First_Name, employees.lastName AS Last_Name, role.title AS Title, role.salary AS Salary, department.name AS Department, CONCAT(e.firstName, ' ' ,e.lastName) AS Manager FROM employees INNER JOIN role on role.id = employees.roleID INNER JOIN department on department.id = role.departmentID LEFT JOIN employees e on employees.managerID = e.id;", 
    function(err, res) {
      if (err) throw err
      console.log ("");
      console.log("Employee List");
      console.log ("");
      console.table(res)
      runEmployeeDB()
  })
}

// Add a Department
function addDepartment() { 

    inquirer.prompt([
        {
          name: "name",
          type: "input",
          message: "What department would you like to add?"
        },
        {
            name: "id",
            type: "input",
            message: "What is the new Department ID number?"
          }

    ]).then(function(answers) {
        connection.query("INSERT INTO department SET ? ",
            {
              name: answers.name,
              id: answers.id
            },
            function(err) {
                if (err) throw err
                console.table(res);
                runEmployeeDB();
            }
        )
    })
  }

// Add a department - array
  let deptArray = [];
  function selectDepartment() {
    connection.query("SELECT * FROM department", function(err, res) {
      if (err) throw err
      for (var i = 0; i < res.length; i++) {
        deptArray.push(res[i].name);
      }
  })
  return deptArray;
  }

  // Add a role - array
  let roleArray = [];                                
function selectRole() {
  connection.query("SELECT * FROM role", function(err, res) {
    if (err) throw err
    for (var i = 0; i < res.length; i++) {
      roleArray.push(res[i].title);
    }
  })
  return roleArray;
}

// Add an employee - array
let managerArray = [];
function selectManager() {
  connection.query("SELECT firstName, lastName FROM employees", function(err, res) {
    if (err) throw err
    for (var i = 0; i < res.length; i++) {
      managerArray.push(res[i].firstName);
    }
  })
  return managerArray;
}

// Add a Role
function addRole() { 
    connection.query("SELECT role.title AS Title, role.salary AS Salary FROM role LEFT JOIN department.name AS Department FROM department;",   function(err, res) {
      inquirer.prompt([
          {
            name: "title",
            type: "input",
            message: "What is name of the new role?"
          },
          {
            name: "salary",
            type: "input",
            message: "What is the salary of the new role?"
          } ,
          {
            name: "department",
            type: "rawlist",
            message: "Which department will contain this new role?",
            choices: selectDepartment()
          }
      ]).then(function(answers) {
          var deptId = selectDepartment().indexOf(answers.choice) + 1
          connection.query(
              "INSERT INTO role SET ?",
              {
                title: answers.title,
                salary: answers.salary,
                departmentID: deptId
              },
              function(err) {
                  if (err) throw err
                  console.table(answers);
                  runEmployeeDB();
              }
          )     
      });
    });
};

//Add an Employee
function updateEmployeeRole() {
    connection.query("SELECT employees.lastName, role.title FROM employees JOIN role ON employees.roleID = role.id;", 
    (err, res) => {
            if (err) throw err;
 
            inquirer.prompt([
                {
                    name: "lastName",
                    type: "rawlist",
                    choices: function () {
                        var lastName = [];
                        for (var i = 0; i < res.length; i++) {
                            lastName.push(res[i].lastName);
                        }
                        return lastName;
                    },
                    message: "What is the employee's last name?",
                },
                {
                    name: "role",
                    type: "rawlist",
                    message: "What is the employee's new title?",
                    choices: selectRole()
                },
            ]).then(function (answers) {
                var roleId = selectRole().indexOf(answers.role) + 1;
                connection.query("UPDATE employees SET WHERE ?",
                    {
                        lastName: answers.lastName,
                        roleID: roleId
                    },
        
                    function (err) {
                        if (err)
                            throw err;
                        console.table(answers);
                        runEmployeeDB();
                    });
            });
        });
  };
