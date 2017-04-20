'use strict';

import Sequelize from 'sequelize';
import conn from '../conn';

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
