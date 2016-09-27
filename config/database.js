var Sequelize = require('sequelize');
var sequelize = new Sequelize('User', 'localhost');

var Users = sequelize.define('Users', {
	Username : {
		type : Sequelize.STRING,
		allowNull : false,
		unique: true,
		validate:  {
			isAlphanumeric: true,
			notEmpty: true,
			min: 6
		}
	},
	Email : {
		type : Sequelize.STRING,
		allowNull : false,
		unique: true,
		validate : {
			isEmail: true,
			notEmpty: true
		}
	},
	PasswordHash : {
		type : Sequelize.STRING,
		allowNull : false,
		validate : {
			notEmpty: true,
			min: 6
		}
	},
	ProfilePhoto : {
		type : Sequelize.STRING,
		defaultValue: '/url/to/photo'
	},
	IsAdmin : {
		type : Sequelize.BOOLEAN,
		defaultValue: false
	}
}, {
	comment: "Users table is used for storing the personal details of a User."
});

module.exports = {'Sequelize' : sequelize, 'Users' : Users };