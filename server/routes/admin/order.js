const router = require( 'express' ).Router();
const { User, Order } = require( '../../../db' );
const jwt = require( 'jwt-simple' );
const secret = process.env.SECRET || '1701-FLX-NY';

router.use( '/:token', ( req, res, next ) => {
  req.userId = jwt.decode( req.params.token, secret ).id;
  next();
} );

function isAdmin( req ) {
  return User.findById( req.userId )
    .then( user => {
      if ( !user.isAdmin ) throw new Error( 'User is not an admin' );
      return user.isAdmin;
    } );
}

router.get( '/:token', ( req, res, next ) => {
  isAdmin( req )
    .then( () => Order
      .scope( req.query.scope || 'all' )
      .findAll( { include: [ User ] } )
    )
    .then( orders => res.json( orders ) )
    .catch( next );
} );

router.put( '/:token/:orderId', ( req, res, next ) => {
  isAdmin( req )
    .then( () => Order
      .findOne( { where: { userId: req.userId, id: req.params.orderId } } ) )
    .then( order => {
      order.status = req.body.status;
      return order.save();
    } )
    .then( order => res.json( order ) );
} );


// Don't use the default error handler, use this instead
router.use( ( err, req, res, next ) => {
  if ( err.message === 'User is not an admin' ) res.sendStatus( 401 );
} );

module.exports = router;

