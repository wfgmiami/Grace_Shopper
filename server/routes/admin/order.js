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
      .scope( 'user', req.query.scope || 'all' )
      .findAll()
    )
    .then( orders => res.json( orders ) )
    .catch( next );
} );


// Don't use the default error handler, use this instead
router.use( ( err, req, res, next ) => {
  if ( err.message === 'User is not an admin' ) res.sendStatus( 401 );
} );

module.exports = router;

