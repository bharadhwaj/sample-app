var express = require('express');
var Sequelize = require('sequelize');
var passwordhash = require('password-hash');
var session = require('express-session')

var app = express();

var router = express.Router();


var sequelize = require('../config/database').Sequelize;
var Users = require('../config/database').Users;

router.get('/', function(req, res) {
	
});

/* New user login option. */
router.post('/', function(req, res) {
	req.session.destroy(function(err) {
			  if (err) {
			    throw err;
			  }
			  res.redirect('/login');
			})

	.catch(function(err) {
		console.log(err);
		res.redirect('/');
	});
});


module.exports = router;