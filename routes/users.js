const express = require("express");
const db = require("../config.js");
	router = express.Router();

// get user lists
router.get("/list", function (req, res) {
	let sql = `SELECT * FROM users`;
	db.query(sql, function (err, data, fields) {
		if (err) throw err;
		res.json({data});
	});
});

router.post('/new', function(req, res) {
    let sql = `INSERT INTO users(full_name, qr_code, created) VALUES (?)`;
    let values = [
      req.body.full_name,
      req.body.qr_code,
      req.body.created
    ];
    db.query(sql, [values], function(err, data, fields) {
      if (err) throw err;
      res.json({
        status: 200,
        message: "New user added successfully"
      })
    })
});

router.post('/tracker', function(req, res) {
    let sql = `INSERT INTO tracker_list(full_name, verified) VALUES (?)`;
    let values = [
      req.body.full_name,
      req.body.verified
    ];
    db.query(sql, [values], function(err, data, fields) {
      if (err) throw err;
      res.json({
        status: 200,
        message: "Entry added successfully"
      })
    })
});

module.exports = router;