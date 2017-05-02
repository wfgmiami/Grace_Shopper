'use strict';

const conn = require( '../conn' );
const { Sequelize } = conn;

const Payment = conn.define('payments', {
  cardType: {
    type: Sequelize.ENUM,
    values: [ 'Credit', 'Debit' ],
    allowNull: false
  },
  cardVendor: {
    type: Sequelize.STRING,
    allowNull: false
  },
  expiration: {
    type: Sequelize.DATE,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING
  },
  billingAddress: {
    type: Sequelize.TEXT
  }
});

module.exports = Payment;
