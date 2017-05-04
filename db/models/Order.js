// Orders must belong to a user OR guest session (authenticated vs unauthenticated)
// Orders must contain line items that capture the price, current product ID and quantity
// If a user completes an order, that order should keep the price of the item at the time when they checked out even if the price of the product later changes

const sequelize = require( '../conn' );
const Glasses = require( './Glasses' );

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
  // userId/guestId through association
  // addressId through association
}, {
  hooks: {
    beforeValidate(order) {
      if (order.status !== 'Pending' && !order.paymentId) {
        throw new Error('There is no payment associated to the order');
      }
      if (order.status !== 'Pending' && !order.shippingAddress) {
        throw new Error('There is no shipping address associated to the order');
      }
    }
  },
  scopes: {
    pending: Object.assign( { status: 'Pending' }, includes ),
    shipping: Object.assign( { status: 'Shipping' }, includes ),
    delivered: Object.assign( { status: 'Delivered' }, includes ),
    cancelled: Object.assign( { status: 'Cancelled' }, includes )
  }
} );

module.exports = Order;

