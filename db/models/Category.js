'use strict';

const conn = require('../conn');
const { Sequelize } = conn;

const Category = conn.define('categories', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  value: {
    type: Sequelize.STRING
  }
});

module.exports = Category;
