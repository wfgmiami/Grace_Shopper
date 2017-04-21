const sequelize = require( '../conn' );

const { Sequelize } = sequelize;

const LineItem = sequelize.define( 'orders', {
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

module.exports = LineItem;
