// Orders must belong to a user OR guest session (authenticated vs unauthenticated)
// Orders must contain line items that capture the price, current product ID and quantity
// If a user completes an order, that order should keep the price of the item at the time when they checked out even if the price of the product later changes

const sequelize = require( '../conn' );
const Glasses = require( './Glasses' );
const User = require( './User' );

const { Sequelize } = sequelize;

const includes = {
  include: [ {
    model: Glasses.scope( 'categories' ),
    attributes: {
      exclude: [
        'inventory', 'createdAt', 'updatedAt', 'price', 'description'
      ]
    },
    through: { attributes: [ 'quantity', 'price' ] }
  } ]
};

const Order = sequelize.define( 'orders', {
  status: {
    type: Sequelize.ENUM,
    values: [ 'Pending', 'Shipping', 'Delivered', 'Cancelled' ],
    defaultValue: 'Pending'
  },
  shippingAddress: {
    type: Sequelize.TEXT
  }
  // productId through association
  // userId through association
  // addressId through association
}, {
    // scopes: {
    // pending: Object.assign( { status: 'Pending' }, includes ),
    // shipping: Object.assign( { status: 'Shipping' }, includes ),
    // delivered: Object.assign( { status: 'Delivered' }, includes ),
    // cancelled: Object.assign( { status: 'Cancelled' }, includes )
  scopes: {
    pending: Object.assign( { where: { status: 'Pending', userId: { $ne: null } } }, includes ),
    shipping: Object.assign( { where: { status: 'Shipping', userId: { $ne: null } } }, includes ),
    delivered: Object.assign( { where: { status: 'Delivered', userId: { $ne: null } } }, includes ),
    cancelled: Object.assign( { where: { status: 'Cancelled', userId: { $ne: null } } }, includes ),
    all: Object.assign( { where: { userId: { $ne: null } } }, includes ),
    user: { include: [ User ] }
  },
  hooks: {
    beforeValidate( order ) {
      if ( order.status !== 'Pending' && !order.paymentId ) {
        throw new Error( 'There is no payment associated to the order' );
      }
      if ( order.status !== 'Pending' && !order.shippingAddress ) {
        throw new Error( 'There is no shipping address associated to the order' );
      }
    }
  }
} );

module.exports = Order;

