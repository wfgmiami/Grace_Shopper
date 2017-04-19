'use strict'

import Sequelize from 'sequelize';

const User = Sequelize.define('users', {
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