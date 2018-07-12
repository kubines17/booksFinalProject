var express = require('express');
var router = express.Router();
var sendEmail = require('../helpers/sendEmail')
const config = require('../config')
var hash = require('../helpers/generateHash')
var async = require('async');

module.exports = function(app, db) {

	router.get('/signup',function(req, res) {
		res.render('signup', {});
	});

	router.get('/signin',function(req, res) {
		res.render('signin', {message: null});
	});


	router.post('/signup',function(req, res) {
		db.User.create({
			Email: req.body.email,
        	Password: hash(req.body.pass)
        });
		res.send('done')
	});
			
	router.post('/signin',function(req, res) {
		db.User.findOne({
  		where: {email: req.body.email,
  				password: hash(req.body.pass)},
		}).then(project => {
			console.log(project)
			//console.log(project.dataValues.Password)
			if(project == null) {
				res.send('Не верный логин или пароль')				
			} else {
				for(elem of config.admins) {
					if (project.dataValues.Email == elem) {
						res.cookie('admin', true)
					}
				}	
					res.cookie('user', project.dataValues.Email)
					
				}
			res.redirect('/')
		})
	});

	app.use('/users', router);
};
