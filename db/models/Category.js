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
  value: { // what is this value? Just not understanding your categories I think
    type: Sequelize.STRING,
    allowNull: false,
    unique: 'compositeIndex',
    validate: {
      notEmpty: true
    }
  }
});

module.exports = Category;
