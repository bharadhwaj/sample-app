var express = require('express');
var Sequelize = require('sequelize');
var passwordhash = require('password-hash');
var session = require('express-session')

var app = express();

var router = express.Router();


var sequelize = require('../config/database').Sequelize;
var Users = require('../config/database').Users;

router.get('/', function(req, res) {
  if (req.session.username)
  	res.json(req.session.username);
});

/* New user login option. */
router.post('/', function(req, res) {
	sequelize.sync()	
	.then(function() {
		Users.findOne({ 
			where: { Username: req.body.username } 
		})
		.then(function(user) {
			if (passwordhash.verify(req.body.password, user.PasswordHash)) {
			
				req.session.username = user.Username
				res.redirect('/login');
				// res.json(user);
				// console.log(user.get({
				// 	plain: true
				// }));
				//res.redirect('/login');
				// req.session.destroy(function(err) {
				//   if (err) {
				//     throw err;
				//   }
				//   res.json({"status": "admin logged out"});
				// });
			}
			else {
				res.redirect('/');
			}
		})
		.catch(function(err) {
			console.log(err);
			res.redirect('/login');
		});
	});
});

module.exports = router;