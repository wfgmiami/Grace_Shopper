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
    type: Sequelize.STRING, // I almost feel like enumberable makes a lot of sense here, but that is just a thought (MC, Visa, Amex, Discover)
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
}, {
  scopes: {
    expired: {
      expiration: { $lt: new Date() }
    }
  }
});

module.exports = Payment;
