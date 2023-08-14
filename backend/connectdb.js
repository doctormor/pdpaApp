const mysql = require("mysql2");

// connection to mysql database
const dbCon = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "pdpa",
});

// const dbCon = mysql.createConnection({
//   host: "pdpa_db",
//   user: "pdpauser",
//   password: "Log2@pdpa",
//   database: "pdpa",
// });

dbCon.connect();

module.exports = dbCon;
