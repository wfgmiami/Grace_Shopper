const router = require( 'express' ).Router();
const { User } = require( '../../../db' );
const jwt = require( 'jwt-simple' );
const secret = process.env.SECRET || '1701-FLX-NY';

module.exports = router;

router.use( '/:token', ( req, res, next ) => {
  req.userId = jwt.decode( req.params.token, secret ).id;
  next();
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

function isAdmin( req ) {
  return User.findById( req.userId )
    .then( user => {
      if ( !user.isAdmin ) throw new Error( 'User is not an admin' );
      return user.isAdmin;
    } );
}

