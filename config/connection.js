const mysql = require('mysql2');

const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // TODO: Add MySQL password here
      password: 'root',
      database: 'employees_db'
    },
    console.log(`Connected to the employees_db database.`)
  );

module.exports = {db, mysql};