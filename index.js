const express = require("express");
const db = require("./config.js")
const usersRouter = require('./routes/users');

cors = require('cors'),
bodyParser = require('body-parser');
const app = express();
const PORT = 3001;

app.use(cors())
app.use(bodyParser.json());
// open the MySQL connection
db.connect((error) => {
	if (error) {
		console.log("A error has been occurred " + "while connecting to database.");
		throw error;
	}

	//If Everything goes correct, Then start Express Server
	app.listen(PORT, () => {
		console.log(
			"Database connection is Ready and " + "Server is Listening on Port ",
			PORT
		);
	});
});

app.get("/", (req, res) => {
	res.set("Access-Control-Allow-Origin", "*");
	res.send({ msg: "This has CORS enabled" });
});

app.use('/users', usersRouter);