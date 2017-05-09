const router = require( 'express' ).Router();
const { Order, Glasses, User, LineItem } = require( '../../db' );
const jwt = require( 'jwt-simple' );

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
    req.userId = jwt.decode( req.params.token, res.locals.jwtSecret ).id;
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
  Order.itemAdd( userId, cart )
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
  const userId = jwt.decode( req.params.token, res.locals.jwtSecret ).id;
  let { body: { cart } } = req;
  Order.integrate( userId, cart )
    .then( () => res.sendStatus( 201 ) )
    .catch( err => console.log( err ) );
} );

module.exports = router;

