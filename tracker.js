var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Port
  port: 3306,

  //Username
  user: "root",

  //Password
  password: "rootroot",
  database: "employeeTracker_db"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  start();
  //viewEmployees();
});

// function which prompts the user for what action they should take
function start() {
    inquirer
      .prompt({
        name: "action",
        type: "list",
        message: "Would you like to do?",
        choices: [
          "Add employee", 
          "View employees by name", 
          "View employees by role ID", 
          "View employees by department ID", 
          "Update employee"
        ]
      })
      .then(function(answer) {
        // based on their answer, call to add, view or uupdate employee functions
        switch (answer.action) {
          case "Add employee":
            addEmployee();
            break;
        
          case "View employees by name":
            viewEmployee();
            break;
        
          case "View employees by role ID":
            viewEmployeeRole();
            break;
        
          case "View employees by department ID":
            viewEmployeeDepartment();
            break;

          case "Update employee":
            updateEmployeeRole();
            break;
        }
        // else{
        //   connection.end();
        // }
      });
  }
//View employee
function viewEmployee() {
    console.log("Employee List: \n");
    connection.query("SELECT * FROM employee", function (err, res) {
      if (err) throw err;
      console.table(res);
      start();
    });
  }
  //View employee
function viewEmployeeRole() {
  console.log("Employee List: \n");
  connection.query("SELECT * FROM role", function (err, res) {
    if (err) throw err;
    console.table(res);
    start();
  });
}
//View employee
function viewEmployeeDepartment() {
  console.table("Employee List: \n");
  connection.query("SELECT * FROM department", function (err, res) {
    if (err) throw err;
    console.table(res);
    start();
  });
}
// Add employee
  function addEmployee() {
    console.table("Follow prompts to add new employee:\n");
    inquirer
      .prompt([
        {
            name: "first_name",
            type: "input",
            message: "Enter employee's first name:",
          
        },
        { 
            name: "last_name",
            type: "input",
            message: "Enter employee's last name:",
          
        },
        {
            name: "id",
            type: "input",
            message: "Enter employee's id number:",
            
        },
        {
            name: "manager",
            type: "input",
            message: "Is this a manager role? if not press press '0' for manager ID",
        },
      ])
      .then(function (answer) {
        var firstName = answer.first_name;
        var lastName = answer.last_name;
        var roleId = answer.id;
        var isManager = answer.manager;
  
        if (isManager) {
          inquirer
            .prompt([
              {
                name: "manager_id",
                type: "input",
                message: "What is the manager ID?",
              },
            ])
            .then(function (answer) {
              var query = connection.query(
                "INSERT INTO employee SET ?",
                {
                  first_name: firstName,
                  last_name: lastName,
                  role_id: roleId,
                  manager_id: answer.manager_id,
                },
                function (err, res) {
                  if (err) throw err;
                  console.table(
                    res.affectedRows +
                      " New Employee added!\n"
                  );
                  start();
                }
              );
            });
        } else {
          var query = connection.query(
            "INSERT INTO employee SET ?",
            {
              first_name: answer.first_name,
              last_name: answer.last_name,
              role_id: answer.id,
            },
            function (err, res) {
              if (err) throw err;
              console.table(
                res.affectedRows + " New Employee has been successfully added!\n"
              );
              start();
            }
          );
        }
      });
  }
  // //update employee
function updateEmployeeRole() {
    console.table("Updating employee role\n");
    inquirer
    .prompt([
      {
        name: "employee_id",
        type: "input",
        message: "Whats is the ID of the employee you wish to update?",
      }
    ])
    .then(function(answer) {
      var empId = answer.employee_id;
      if(empId) {
    inquirer
      .prompt([
        {
          name: "title",
          type: "input",
          mesage: "What is the title?",
        },
        {
          name: "salary",
          type: "input",
          message: "What is the employees salary?",
        },
        {
          name: "dep_id",
          type: "input",
          message: "What is the employees ID?"
        },
      ])
      .then(function(answer) {

      var newTitle = answer.title;
      var newSalary = answer.salary;
      var newId = answer.dep_id;

      var query = connection.query(
      "UPDATE role SET ?",
      [
        {
          title: newTitle, 
          salary: newSalary,
          department_id: newId,
        },
      ],
      function(err, res) {
        if (err) throw err;
        console.table(res.affectedRows + "Employee role updated!\n");
        
        viewEmployeeRole();
      }
    );
    // logs the actual query being run
    console.table(query.sql);
  })
}
})
}
  

// function updateEmployee() {
//   //console.log("Follow prompts to update Role: \n");
//   inquirer
//     .prompt([
//       {
//         name: "employee_id",
//         type: "input",
//         message: "Enter employee's id:"
//       },
//     ])
//     .then(function (answer) {
//       var id = answer.id;
//       if(id){
//       inquirer
//         .prompt([
//           {
//             type: "list",
//             message: "Enter employees name:",
//             choices: [
//               "Developer",
//               "Designer",
//               "Content creator",
//             ],
//             // name: "role_type",
//           },
//           {
//             type: "input",
//             message: "Enter new salary:",
//             name: "salary",
//           },
//           {
//             type: "input",
//             message: "Enter department ID:",
//             name: "dept_id",
//           },
//         ])
//         function (err, res) {
//           if (err) throw err;
//           console.log(res.affectedRows + " Role updated!\n");
//           // Call deleteRole AFTER the UPDATE completes
//           viewRole();
//           //deleteRole();
//         }
//       // );
//     };
//   }
// );
// }