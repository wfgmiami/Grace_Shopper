'use strict';
const db = require( './conn' );

// Require our models. Running each module registers the model into sequelize
// so any other part of the application can simply call sequelize.model('User')
// to get access to the User model.
const Category = require( './models/Category' );
const Glasses = require( './models/Glasses' );
const LineItem = require( './models/LineItem' );
const Order = require( './models/Order' );
const Payment = require( './models/Payment' );
const Review = require( './models/Review' );
const User = require( './models/User' );

// Order has userId
User.hasMany( Order );
Order.belongsTo( User );

// Order has paymentId
Payment.hasMany( Order );
Order.belongsTo( Payment );

// Payment has userId
Payment.belongsTo( User );
User.hasMany( Payment );

// Orders have lineitems which are glasses
Order.belongsToMany( Glasses, { through: LineItem } );
Glasses.belongsToMany( Order, { through: LineItem } );

// Glasses have many categories
[ 'color', 'shape', 'ideal_face_shape', 'material', 'gender' ].forEach( cat => {
  Glasses.belongsToMany( Category, { through: 'glassesCategory', as: cat } );
  Category.belongsToMany( Glasses, { through: 'glassesCategory', as: cat } );
} );

Glasses.belongsToMany( Category, { through: 'glassesCategory' } );
Category.belongsToMany( Glasses, { through: 'glassesCategory' } );

// Review has glassesId
Glasses.hasMany( Review );
Review.belongsTo( Glasses );

// Review has userId
User.hasMany( Review );
Review.belongsTo( User );

// This is used in /server/app.js
const sync = () => db.sync();

module.exports = {
  Category,
  Glasses,
  LineItem,
  Order,
  Payment,
  Review,
  User,
  sync
};

