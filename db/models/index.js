'use strict';
// Require our models. Running each module registers the model into sequelize
// so any other part of the application could call sequelize.model('User')
// to get access to the User model.
const User = require( './User' );
const Glasses = require( './Glasses' );
const Review = require( './Review' );
const Order = require( './Order' );
const LineItem = require( './LineItem' );
const Category = require( './Category' );

User.hasMany( Order );
Order.belongsTo( User );

Order.belongsToMany( Glasses, { through: LineItem } );
Glasses.belongsToMany( Order, { through: LineItem } );

Glasses.belongsToMany( Category, { through: 'glassesCategory' } );
Category.belongsToMany( Glasses, { through: 'glassesCategory' } );

Glasses.hasMany( Review );
User.hasMany( Review );
Review.belongsTo( Glasses );
Review.belongsTo( User, { through: 'userReview' } );

module.exports = {
  Category,
  Glasses,
  LineItem,
  Order,
  Review,
  User,
};

