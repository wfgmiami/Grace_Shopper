'use strict';
// Require our models. Running each module registers the model into sequelize
// so any other part of the application could call sequelize.model('User')
// to get access to the User model.

const User = require( './User' );
const Product = require( './Product' );
const Review = require( './Review' );
const Order = require( './Orders' );
const LineItem = require( './LineItem' );


User.hasMany( Order );
Order.belongsTo( User );

Product.belongsToMany( Order );
Order.belongsToMany( Product );

Order.belongsToMany( Product, { through: LineItem } );
LineItem.belongsToMany( Order, { through: LineItem } );

Review.belongsTo( Product, { through: 'UserReview' } );
Review.belongsTo( User, { through: 'UserReview' } );


module.exports = {
  Product,
  Review,
  Order,
  LineItem,
  User
};

