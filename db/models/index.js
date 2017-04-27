'use strict';
// Require our models. Running each module registers the model into sequelize
// so any other part of the application could call sequelize.model('User')
// to get access to the User model.
const Category = require( './Category' );
const Glasses = require( './Glasses' );
const LineItem = require( './LineItem' );
const Order = require( './Order' );
const Payment = require( './Payment' );
const Review = require( './Review' );
const User = require( './User' );

User.hasMany( Order );
Order.belongsTo( User );

Order.belongsToMany( Glasses, { through: LineItem } );
Glasses.belongsToMany( Order, { through: LineItem } );

['color', 'shape', 'ideal_face_shape', 'material'].forEach(cat => {
  Glasses.belongsToMany( Category, { through: 'glassesCategory', as: cat } );
  Category.belongsToMany( Glasses, { through: 'glassesCategory', as: cat } );
});

Glasses.belongsToMany( Category, { through: 'glassesCategory' } );
Category.belongsToMany( Glasses, { through: 'glassesCategory' } );

Glasses.hasMany( Review );
User.hasMany( Review );
Review.belongsTo( Glasses );
Review.belongsTo( User );

module.exports = {
  Category,
  Glasses,
  LineItem,
  Order,
  Payment,
  Review,
  User,
};

