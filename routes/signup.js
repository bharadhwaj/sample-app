var express = require('express');
var Sequelize = require('sequelize');
var passwordhash = require('password-hash');

var router = express.Router();

var sequelize = require('../config/database').Sequelize;
var Users = require('../config/database').Users;

/* New user signup option. */
router.post('/', function(req, res) {
	sequelize.sync()
	.then(function() {
		Users.create({
			Username: req.body.username,
			Email: req.body.email,
			PasswordHash : passwordhash.generate(req.body.password)
		})
		.then(function(users) {
			res.json(users);
			console.log(users.get({
				plain: true
			}));
		})
		.catch(Sequelize.ValidationError, function(err) {
			console.log(err);
			res.redirect('/');
		})
		.catch(function(err) {
			console.log(err);
			res.redirect('/');
		});
	});
});

module.exports = router;