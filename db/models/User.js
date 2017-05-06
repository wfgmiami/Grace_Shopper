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
      //isAlpha: true,
      len: [ 2, 255 ]
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
  passwordExpired: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  isAdmin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
   googleId: {
    type: Sequelize.STRING
  },
}, {
  scopes: {
    admin: {
      isAdmin: true
    },
    resetPassword: {
      passwordExpired: true
    }
  },
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
      console.log('............thisid',this.id)
      return Order.scope('pending').findOrCreate( {
        where: { userId: this.id }
      } );
    }
  }
} );

module.exports = User;

