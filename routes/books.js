var express = require('express');
var router = express.Router();
var sendEmail = require('../helpers/sendEmail')
const utf8 = require('utf8');
var decode = require('../helpers/decode')

/* libraries for photo upload */
var multer = require('multer');
var upload = multer({dest: './public/img'});

module.exports = function(app, db) {

	router.get('/',function(req, res) {
		db.Book.findAll().then(books => {
			res.render('books', {books});
		})
	});

	router.get('/remove',function(req, res) {
		if(req.cookies.admin) {
			db.Book.destroy({where: {id: req.query.id }}).then(function(){
				res.redirect('/admin')
			})
		} else {
			res.send('Not allowed')
		}
		
	});

	router.get('/single/:id',function(req, res) {
		db.Book.findOne({ 
			where: {
				id: req.params.id
			}}).then(book => {
				res.render('single', {book})
			})
	});

	router.post('/add', upload.any(), function(req, res) {
		db.Book.create({
			title: req.body.title,
			author: req.body.author,
			description: req.body.description,
			image: req.files[0].filename
		})
		res.send(req.body)
	});

	router.get('/edit',function(req, res) {
		db.Book.findAll().then(function(books){
			res.render('edit', { books })
		})
	});

	router.get('/change',function(req, res) {
		db.Book.findOne({ 
			where: {
				id: req.query.id
			}}).then(book => {
				console.log(book.title)
				res.render('edbook', {book})
			})
	});

	router.post('/change/update', upload.any(), function(req, res) {
		db.Book.update(
			{
				title: req.body.title,
				author: req.body.author,
				description: req.body.description,
				image: req.files[0].filename
			},
			{where: {id: req.body.id}}
			).then(function(book){
			res.send(req.body)
			})
		})

	app.use('/books', router);
};

