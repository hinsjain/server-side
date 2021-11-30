const express = require("express");
const db = require("../config.js");
router = express.Router();

// get user lists
router.get("/list", function (req, res) {
	let sql = `SELECT * FROM users`;
	db.query(sql, function (err, data, fields) {
		if (err) throw err;
		res.json({ data });
	});
});

router.post("/new", function (req, res) {
	let sql = `INSERT INTO users(full_name, qr_code, created) VALUES (?)`;
	let values = [req.body.full_name, req.body.qr_code, req.body.created];
	db.query(sql, [values], function (err, data, fields) {
		if (err) throw err;
		res.json({
			status: 200,
			message: "New user added successfully",
		});
	});
});

router.get("/tracker_list", function (req, res) {
	let sql = `SELECT * FROM tracker_list`;
	db.query(sql, function (err, data, fields) {
		if (err) throw err;
		res.json({ data });
	});
});

router.get("/tracker_list/:user_id", function (req, res) {
	let userID = req.params.user_id;
	let sql = `SELECT * FROM tracker_list WHERE user_id = ${userID}`;
	db.query(sql, function (err, data, fields) {
		if (err) throw err;
		res.json({ data });
	});
});

router.post("/tracker_new", function (req, res) {
	let find = `SELECT * FROM tracker_list WHERE user_id = ${req.body.user_id}`;
	db.query(find, function (err, result, fields) {
        
		if (result.length < 1) {
			let sql = `INSERT INTO tracker_list(user_id, verified) VALUES (?)`;
			let values = [req.body.user_id, req.body.verified];
			db.query(sql, [values], function (err, data, fields) {
				if (err) throw err;
				res.json({
					status: 200,
					message: "Entry added successfully",
				});
			});
		}
	});
});

module.exports = router;
