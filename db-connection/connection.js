require('dotenv').config()
var mysql = require('mysql')

var db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'choegyel',
  database: 'student_management',
  multipleStatemts: true
});

db.connect((error) =>{
  if(!error)
    console.log('Connection successful');
  else
    console.log(error);
});

module.exports = db
