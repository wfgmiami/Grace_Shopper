const router = require( 'express' ).Router();
const { Order, Glasses, User, LineItem } = require( '../../db' );
const jwt = require( 'jwt-simple' );
const secret = process.env.SECRET || '1701-FLX-NY';

router.get( '/:id', ( req, res, next ) => {
  Order.findById( req.params.id, {
      include: [ Glasses, User ]
    } )
    .then( order => res.json( order ) )
    .catch( next );
} );

router.use( '/pending/:token', ( req, res, next ) => {
  let err;
  try {
    req.userId = jwt.decode( req.params.token, secret ).id;
    err = null;
  } catch ( _err ) {
    err = _err;
    console.log( err );
  } finally {
    next( err );
  }
} );

router.get( '/pending/:token', ( req, res, next ) => {
  const { userId } = req;
  Order.scope( 'pending' ).findOne( { where: { userId } } )
    .then( order => {
      if ( order ) {
        res.json( order.get().glasses );
      } else {
        User.findById( userId )
          .then( user => user.getOrder() )
          .then( order => res.json( order ) );
      }
    } )
    .catch( next );
} );

router.post( '/pending/:token', ( req, res, next ) => {
  const { userId, body: { cart } } = req;
  Promise.all( [
      Order.scope( 'pending' ).findOne( { where: { userId } } ),
    ].concat( cart.map( glasses => Glasses.findById( glasses.id ) ) ) )
    .then( ( [ order, ...glasses ] ) => Promise.all(
      glasses.map( ( glass, idx ) => order.addGlass( glass, {
        quantity: cart[ idx ].lineitems.quantity,
        price: cart[ idx ].lineitems.price,
        date: new Date()
      }, { updatesOnDuplicate: true } ) )
    ) )
    .then( () => res.sendStatus( 201 ) )
    .catch( next );
} );

router.delete( '/pending/:token/:itemId', ( req, res, next ) => {
  const { userId } = req;
  Promise.all( [
      Order.scope( 'pending' ).findOne( { where: { userId } } ),
      Glasses.findById( req.params.itemId )
    ] )
    .then( ( [ order, glasses ] ) => order.removeGlass( glasses ) )
    .then( order => res.json( order ) );
} );

router.post( '/integrate/:token', ( req, res, next ) => {
  const userId = jwt.decode( req.params.token, secret ).id;
  let { body: { cart } } = req;
  Promise.all( [
      Order.scope( 'pending' ).findOne( { where: { userId } } ),
    ].concat( cart.map( glasses => Glasses.findById( glasses.id ) ) ) )
    .then( ( [ order, ...glasses ] ) => {

      cart = cart.map( item => {
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
    } )
    .then( () => res.sendStatus( 201 ) )
    .catch( err => console.log( err ) );
} );

module.exports = router;

