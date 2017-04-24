'use strict';

const md5 = require( 'crypto-md5' );

const Sequelize = require( 'sequelize' );
const conn = require( '../conn' );
const Order = require('./Order');

const User = conn.define( 'users', {
  name: Sequelize.STRING,
  email: {
    type: Sequelize.STRING,
    unique: true,
    validate: {
      isEmail: true,
      notEmpty: true
    }
  },
  password: Sequelize.STRING,
  isAdmin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
}, {
  hooks: {
    beforeCreate( user ) {
      let password = user.password;
      user.password = md5( password, 'hex' );
    },
    beforeBulkCreate( users ) {
      users = users.map( user => {
        let password = user.password;
        user.password = md5( password, 'hex' );
      } );
      return users;
    }
  },
  classMethods: {
    findByNamePassord( name, password ) {
      return this.findOne( { where: { name, password: md5( password, 'hex' ) } } );
    }
  },
  instanceMethods: {
    getOrder() {
      return Order.findOrCreate({
        where: {
          status: 'Pending',
          userId: this.id
        }
      });
    }
  }
} );

module.exports = User;

