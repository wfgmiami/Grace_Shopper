const router = require( 'express' ).Router();
const { User } = require( '../../../db' );
const jwt = require( 'jwt-simple' );
const secret = process.env.SECRET || '1701-FLX-NY';
const chalk = require('chalk');

module.exports = router;

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

router.get( '/:token', ( req, res, next ) => {
  isAdmin( req )
    .then( () => User.findAll( { order: [ 'name' ] } ) )
    .then( users => res.json( users ) )
    .catch( next );
} );

router.delete( '/:token/:userId', ( req, res, next ) => {
  isAdmin( req )
    .then( () => User.findById( req.params.userId ) )
    .then( user => user.destroy() )
    .then( () => res.sendStatus( 204 ) )
    .catch( next );
} );

router.put( '/:token/:userId', ( req, res, next ) => {
  const { mods } = req.body;
  isAdmin( req )
    .then( () => User.findById( req.params.userId ) )
    .then( user => {
      user.isAdmin = mods.isAdmin;
      user.passwordExpired = mods.passwordExpired;
      return user.save();
    } )
    .then( user => res.json( user ) )
    .catch( next );
} );

router.use( ( err, req, res, next ) => {
  console.log(chalk.red(err.message));
  if ( err.message === 'User is not an admin' || err.message === 'Not enough or too many segments' ) res.sendStatus( 401 );
  next( err );
} );

function isAdmin( req ) {
  return User.findById( req.userId )
    .then( user => {
      if ( !user.isAdmin ) throw new Error( 'User is not an admin' );
      return user.isAdmin;
    } );
}

