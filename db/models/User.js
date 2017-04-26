'use strict';

const md5 = require( 'crypto-md5' );

const Sequelize = require( 'sequelize' );
const conn = require( '../conn' );
const Order = require( './Order' );

const User = conn.define( 'users', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [ 5, 255 ]
    }
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true,
      notEmpty: true
    }
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
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
    },
    afterCreate( user ) {
      return user.getOrder();
    }
  },
  classMethods: {
    findByPassword( credentials ) {
      if ( !credentials ) throw new Error( 'No credentials provided' );
      if ( !credentials.password ) throw new Error( 'Password must be included in credentials' );
      credentials.password = md5( credentials.password, 'hex' );
      return this.findOne( { where: credentials } );
    }
  },
  instanceMethods: {
    getOrder() {
      return Order.findOrCreate( {
        where: {
          status: 'Pending',
          userId: this.id
        }
      } );
    }
  }
} );

module.exports = User;

