'use strict';
// Require our models. Running each module registers the model into sequelize
// so any other part of the application could call sequelize.model('User')
// to get access to the User model.

const User = require('./User')
const Product = require('./Product')
const Review = require('./Review');
const Order = require('./Orders');


User.hasMany(Order);
Order.belongsTo(User);

Product.belongsToMany(Order);
Order.belongsToMany(Product);

Product.hasMany(Review);
User.hasMany(Review);
Review.belongsTo(Product);
Review.belongsTo(User);


module.exports = {
	Product, 
	Review, 
	Orders, 
	User
};

