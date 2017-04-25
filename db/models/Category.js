'use strict';

const conn = require('../conn');
const { Sequelize } = conn;

const Category = conn.define('categories', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: 'compositeIndex',
    validate: {
      notEmpty: true
    }
  },
  value: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: 'compositeIndex',
    validate: {
      notEmpty: true
    }
  }
});

module.exports = Category;
