'use strict';
// Require our models. Running each module registers the model into sequelize
// so any other part of the application could call sequelize.model('User')
// to get access to the User model.

const User = require( './User' );
const Glasses = require( './Glasses' );
const Review = require( './Review' );
const Order = require( './Orders' );
const LineItem = require( './LineItem' );

// import User from './User'
// import Glasses from './Glasses'
// import Review from './Review'
// import Order from './Order'
// import LineItem from './LineItem'

console.log(User, Glasses, Review, Order, LineItem);

User.hasMany( Order );
Order.belongsTo( User );


// Order.hasMany(Glasses);


Order.belongsToMany( Glasses, { through: LineItem } );
Glasses.belongsToMany( Order, { through: LineItem } );


Review.belongsTo( Glasses, { through: 'UserReview' } );
Review.belongsTo( User, { through: 'UserReview' } );


module.exports = {
  Glasses,
  Review,
  Order,
  LineItem,
  User
};

