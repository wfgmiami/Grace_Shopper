const router = require( 'express' ).Router();
const { User, Order } = require( '../../../db' );
const jwt = require( 'jwt-simple' );
const secret = process.env.SECRET || '1701-FLX-NY';
const chalk = require('chalk');

router.get( '/', (req, res, next) => {
  res.sendStatus(401);
} );

router.use( '/:token', ( req, res, next ) => {
  let err;
  try {
    req.userId = jwt.decode( req.params.token, secret ).id;
    err = null;
  } catch (_err) {
    err = _err;
  } finally {
    next(err);
  }
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
    .then( () => Order.findOne( { where: { id: req.params.orderId } } ) )
    .then( order => {
      order.status = req.body.status;
      return order.save();
    } )
    .then( order => res.json( order ) )
    .catch( next );
} );

router.use( ( err, req, res, next ) => {
  console.log(chalk.red(err.message));
  if ( err.message === 'User is not an admin' || err.message === 'Not enough or too many segments' ) res.sendStatus( 401 );
  next( err );
} );

module.exports = router;

