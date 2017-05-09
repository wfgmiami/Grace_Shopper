const router = require( 'express' ).Router();
const { User } = require( '../../../db' );
const chalk = require( 'chalk' );

module.exports = router;

router.get( '/', ( req, res, next ) => {
  res.sendStatus( 401 );
} );

require( '../../configure/admin-middleware' )( router );

router.get( '/:token', ( req, res, next ) => {
  res.locals.isAdmin( req )
    .then( () => User.findAll( { order: [ 'name' ] } ) )
    .then( users => res.json( users ) )
    .catch( next );
} );

router.delete( '/:token/:userId', ( req, res, next ) => {
  res.locals.isAdmin( req )
    .then( () => User.findById( req.params.userId ) )
    .then( user => user.destroy() )
    .then( () => res.sendStatus( 204 ) )
    .catch( next );
} );

router.put( '/:token/:userId', ( req, res, next ) => {
  const { mods } = req.body;
  res.locals.isAdmin( req )
    .then( () => User.findById( req.params.userId ) )
    .then( user => { // do you not want to just do an Object.assign(user, mods)? Consider update here as well
      user.isAdmin = mods.isAdmin;
      user.passwordExpired = mods.passwordExpired;
      return user.save();
    } )
    .then( user => res.json( user ) )
    .catch( next );
} );
