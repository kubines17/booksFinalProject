var express = require('express');
var router = express.Router();

module.exports = function(app, db) {


	router.get('/',function(req, res) {
		res.redirect('/books')
	});

	router.get('/single/:id', function(req, res) {
		res.render('single',{})
		});

	app.use('/', router);
};

