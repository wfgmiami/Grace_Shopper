// Orders must belong to a user OR guest session (authenticated vs unauthenticated)
// Orders must contain line items that capture the price, current product ID and quantity
// If a user completes an order, that order should keep the price of the item at the time when they checked out even if the price of the product later changes

const sequelize = require( '../conn' );

const { Sequelize } = sequelize;

const Order = sequelize.define( 'orders', {
  price: { // at the time of purchase
    type: Sequelize.DECIMAL,
    allowNull: false
  },
  date: {
    type: Sequelize.DATE,
    allowNull: false
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  // productId through association
  // userId/guestId through association
  // addressId through association
} );

module.exports = Order;
