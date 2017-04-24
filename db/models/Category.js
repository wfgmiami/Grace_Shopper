'use strict';

const conn = require('../conn');
const { Sequelize } = conn;

const Category = conn.define('categories', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: 'compositeIndex'
  },
  value: {
    type: Sequelize.STRING,
    unique: 'compositeIndex'
  }
});

module.exports = Category;
