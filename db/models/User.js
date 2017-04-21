'use strict';

const Sequelize = require('sequelize');
const conn = require('../conn');

const User = conn.define('users', {
  name: Sequelize.STRING,
  email: {
    type: Sequelize.STRING,
    unique: true,
    validate: {
			isEmail: true,
			notEmpty: true
		}
  },
  password: Sequelize.STRING,
  isAdmin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
});

module.exports = User;
