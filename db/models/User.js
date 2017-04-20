'use strict'

import Sequelize from 'sequelize';
import conn from '../conn';

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
  isAdmin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
}

module.exports = User;

// Users must have a valid email address
// Users email must be unique