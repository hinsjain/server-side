const mysql = require("mysql");

// Create a connection to the database
const connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "server_db",
});

module.exports = connection;