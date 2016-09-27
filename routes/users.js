var express = require('express');
var Sequelize = require('sequelize');
var router = express.Router();
var sequelize = require('../config/database').Sequelize;
var Users = require('../config/database').Users;


/* GET users listing. */
router.get('/', function(req, res) {
	sequelize.sync()
	.then(function() {
		return Users.findAll();
	})
	.then(function(users) {
		res.json(users);
  		console.log(JSON.stringify(users));
  	})
});


/* DELETE a user listing. */
router.delete('/', function(req, res) {
	sequelize.sync()
	.then(function() {
		return Users.destroy({
			where: {
				Username: req.body.username
			}
		});
	})
	.then(function(users) {
  		return Users.findAll();
  	})
  	.then(function(users) {
		res.json(users);
		console.log(users.get({
			plain: true
		}));
	});
});

module.exports = router;
