const router = require( 'express' ).Router();
const { Order, Glasses, User } = require( '../../db' );
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
  req.userId = jwt.decode( req.params.token, secret ).id;
  next();
} );

router.get( '/pending/:token', ( req, res, next ) => {
  const { userId } = req;
  Order.scope( 'pending' ).findOne( { where: { userId } } )
    .then( order => {
      if ( order ) {
        res.json( order.get().glasses );
      } else {
        res.sendStatus( 404 );
        next();
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
      glasses.map( ( glass, idx ) => order.addGlass( glass, { quantity: cart[ idx ].quantity, price: 100, date: new Date() }, { updatesOnDuplicate: true } ) )
    ) )
    .then( () => res.sendStatus( 201 ) )
    .catch( next );
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
          price: 100,
          date: new Date()
        }, { updatesOnDuplicate: true } ) )
      );
    } )
    .then( () => res.sendStatus( 201 ) )
    .catch( err => console.log( err ) );
} );

module.exports = router;

