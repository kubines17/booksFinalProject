var express = require('express');
var router = express.Router();

module.exports = function(app, db) {

	router.get('/',function(req, res) {
		res.render('index', {});
	});

	router.get('/add_book',function(req, res) {
		res.render('add_book', {});
	});

	router.post('/add_book',function(req, res) {
		res.render('add_book', {});
	});

	app.use('/', router);
};