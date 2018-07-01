const config = require('../config')
module.exports = function(email, subject, text) {
	let footer = `\n\nС уважением, BooksKG`

	let nodemailer = require('nodemailer');
	// create reusable transporter object using the default SMTP transport
	var transporter = nodemailer.createTransport({
		host: 'smtp.mail.ru',
		port: 465,
		secure: true, // secure:true for port 465, secure:false for port 587
		auth: {
			user: config.gmailLogin, //from our email
			pass: config.gmailPassword //from our email
		},
		tls: {
        rejectUnauthorized: false
    	}
	});

	/* in case of typo */
	email = email.replace(/\s/g, '').toLowerCase()

	// setup email data with unicode symbols
	var mailOptions = {
		from: 'kuba_kuba_85@list.ru',
		to: email, // list of receivers
		subject: subject,
		text: text + footer
	};
	
	// send mail with defined transport object
	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			console.log(error);
		}
		//console.log('Message %s sent: %s', info.messageId, info.response);
	});	
}