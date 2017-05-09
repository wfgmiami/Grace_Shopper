const sequelize = require( '../conn' );

const { Sequelize } = sequelize;

const LineItem = sequelize.define( 'lineitems', {
  price: { // at the time of purchase
    type: Sequelize.DECIMAL,
    allowNull: false,
    validate: {
      min: 0
    }
  },
  date: { // is this important? Like when the item was added to the cart/order?
    type: Sequelize.DATE,
    allowNull: false
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 1
    }
  },
  // productId through association
  // userId through association
  // addressId through association
} );

module.exports = LineItem;
