'use strict';

const Sequelize = require('sequelize');
const conn = require('../conn');

const Review = conn.define('reviews', {
  rating: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 5,
    validate: {
      notEmpty: true,
      isNumeric: true,
      max: 5,
      min: 1,
    }
  },
  review_text: {
    type: Sequelize.TEXT,
    allowNull: false,
    defaultValue: null,
    validate: {
      notEmpty: true,
    }
  }
});

module.exports = Review;

// All reviews must belong to a product
// All reviews must belong to a user
// All reviews must be at least X characters
