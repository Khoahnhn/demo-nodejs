const nodemailer =  require('nodemailer');
const debug = require("debug")("debug:module_mail");
const hbs = require('nodemailer-express-handlebars');
const path = require("path");


/**
 * @description Dùng để gửi mail spam
 * @param {String} to
 * @param {String} subject
 * @param fullName
 * @param content
 * @param url
 * @param themes
 * @returns {Promise<void>}
 */
function sendMail(to, subject, fullName, content, url, themes){
	try {
		let transporter =  nodemailer.createTransport({
			service: 'Gmail',
			auth: {
				user: 'nguyenhocptit@gmail.com',
				pass: 'hoc28031997'
			}
		});
		let temp = path.join(__dirname, 'themes');
		const handlebarOptions = {
			viewEngine: {
				partialsDir: temp,
				layoutsDir: temp,
				defaultLayout: null,
			},
			viewPath: temp,
		};

		transporter.use('compile', hbs(handlebarOptions));



		let mainOptions = {
			from: 'Tinasoft.vn',
			to: to,
			subject: "subject",
			template: "tinasoft",
			context: {
				message: fullName + ", " + content,
				url: url || "google.com"
			}
		};
		transporter.sendMail(mainOptions, function(err, info){
			if (err) {
				debug(err);
			} else {
				debug('Message sent: ' +  info.response);
			}
		});
	}
	catch (e) {
		debug(e);
	}
}

module.exports = {
	sendMail: sendMail
};