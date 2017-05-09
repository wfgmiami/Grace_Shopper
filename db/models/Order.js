// Orders must belong to a user OR guest session (authenticated vs unauthenticated)
// Orders must contain line items that capture the price, current product ID and quantity
// If a user completes an order, that order should keep the price of the item at the time when they checked out even if the price of the product later changes

const sequelize = require( '../conn' );
const Glasses = require( './Glasses' );

const { Sequelize } = sequelize;

const includes = { // DRY code :D
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

// function scopeObj (status) { // maybe this is even MORE dry :D :D
//   return Object.assign({
//     where: {
//       status, 
//       userId: { $ne: null } 
//     }, 
//     include: [{
//       model: Glasses.scope( 'categories' ),
//       attributes: {
//         exclude: [
//           'inventory', 'createdAt', 'updatedAt', 'price', 'description'
//         ]
//       },
//       through: { attributes: [ 'quantity', 'price' ] }
//     }]
//   })
// }

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

  scopes: {
    // pending: scopeObj('Pending') <-- based on the function I mention above. Maybe this works?!
    pending: Object.assign( { where: { status: 'Pending', userId: { $ne: null } } }, includes ),
    shipping: Object.assign( { where: { status: 'Shipping', userId: { $ne: null } } }, includes ),
    delivered: Object.assign( { where: { status: 'Delivered', userId: { $ne: null } } }, includes ),
    cancelled: Object.assign( { where: { status: 'Cancelled', userId: { $ne: null } } }, includes ),
    all: Object.assign( { where: { userId: { $ne: null } } }, includes )
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
  },
  classMethods: {
    integrate(userId, cart) { 
      return Promise.all( [ // the following code format === inconsistent
        Order.scope( 'pending' ).findOne( { where: { userId } } ), // what if there isn't a pending order already? Maybe you take care of this by calling user.getOrder first?
      ].concat( cart.map( glasses => Glasses.findById( glasses.id ) ) ) ) // for readability I would almost pull out the cart.map into its own variable to prettify this situation
      .then( ( [ order, ...glasses ] ) => {
        // this seems a bit convoluted :/ I'm wondering if you update the order and save it if it will update the through table

        // don't reassign the original cart, make a new variable
        cart = cart.map( item => { // why do you say glasses above and item here?
          const ind = order.glasses.findIndex( tst => tst.id === item.id );
          if ( ind > -1 ) {
            item.lineitems.quantity += order.glasses[ ind ].lineitems.quantity;
          }
          return item;
        } );

        return Promise.all(
          glasses.map( ( glass, idx ) => order.addGlass( glass, {
            quantity: cart[ idx ].lineitems.quantity,
            price: cart[ idx ].lineitems.price,
            date: new Date()
          }, { updatesOnDuplicate: true } ) )
        );
      } );
    },
    itemAdd(userId, cart) {
      return Promise.all( [
        Order.scope( 'pending' ).findOne( { where: { userId } } ),
      ].concat( cart.map( glasses => Glasses.findById( glasses.id ) ) ) )
      .then( ( [ order, ...glasses ] ) => Promise.all(
        glasses.map( ( glass, idx ) => order.addGlass( glass, {
          quantity: cart[ idx ].lineitems.quantity,
          price: cart[ idx ].lineitems.price,
          date: new Date()
        }, { updatesOnDuplicate: true } ) )
      ) );
    }
  }
} );

module.exports = Order;
