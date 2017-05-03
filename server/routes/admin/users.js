const router = require( 'express' ).Router();
const { User } = require( '../../../db' );
const jwt = require( 'jwt-simple' );
const secret = process.env.SECRET || '1701-FLX-NY';

router.use( '/:token', (req, res, next) => {
  req.userId = jwt.decode( req.params.token, secret ).id;
  next();
});

router.get( '/:token', ( req, res, next ) => {
  User.findById( req.userId )
    .then( user => {
      if ( !user ) return res.sendStatus( 401 );
      return user.isAdmin;
    } )
    .then( isAdmin => {
      if ( isAdmin ) return User.findAll( { order: [ 'name' ] } );
    } )
    .then( users => res.json( users ) );
} );

router.delete( '/:token/:userId', (req, res, next) => {
  User.findById( req.userId )
    .then( user => {
      if ( !user ) return res.sendStatus( 401 );
      return user.isAdmin;
    } )
    .then( isAdmin => {
      if ( isAdmin ) return User.findById( req.params.userId );
    } )
    .then( user => user.destroy())
    .then(() => res.sendStatus(204))
    .catch(next);
});

router.put( '/:token/:userId', (req, res, next) => {
  console.log(req.body);
  const { mods } = req.body;
  User.findById( req.userId )
    .then( user => {
      if ( !user ) return res.sendStatus( 401 );
      return user.isAdmin;
    } )
    .then( isAdmin => {
      if ( isAdmin ) return User.findById( req.params.userId );
      else throw new Error('User is not an admin');
    } )
    .then( user => {
      user.isAdmin = mods.isAdmin;
      user.passwordExpired = mods.passwordExpired;
      return user.save();
    } )
    .then( user => res.json(user) )
    .catch(next);
});

module.exports = router;

