var express = require('express');
var router = express.Router();

module.exports = function(app, conn) {

	router.get('/create',function(req, res) {
		res.render('signup', {});
	});

	router.post('/create',function(req, res) {
		var sql = "INSERT INTO user (Email, Password) VALUES ('%Email', '%Password')";
			
		sql = sql.replace('%Email', req.body.email)
		sql = sql.replace('%Password', req.body.pass)


		conn.query(sql, function (err, result) {
			console.log(err)
			if (err) {
				res.send('Can not create account')
			} else {
				res.render('index')
			}
		});
	});

	router.get('/login',function(req, res) {
			res.render('signin', {});
		});

	router.post('/login',function(req, res) {
			var sql = "select Email, Password from user where Email like '%Email' and Password like '%Password'";
			sql = sql.replace('%Email', req.body.email)
			sql = sql.replace('%Password', req.body.pass)
			conn.query(sql, function (err, result) {
				if (err) {
				res.send('Can not login')
				}
				else if (!result[0]) {
					res.send('Can not login')
				} else {
					res.send(result[0])
				}
			});
		});
	app.use('/users', router);
};

