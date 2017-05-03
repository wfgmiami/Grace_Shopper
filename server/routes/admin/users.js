const router = require( 'express' ).Router();
const { User } = require( '../../../db' );
const jwt = require('jwt-simple');
const secret = process.env.SECRET || '1701-FLX-NY';

router.get( '/:token', ( req, res, next ) => {
  const token = jwt.decode( req.params.token, secret );
  User.findById( token.id )
    .then( user => {
      if ( !user ) return res.sendStatus( 401 );
      return user.isAdmin;
    } )
    .then(isAdmin => {
      if (isAdmin) return User.findAll();
    })
    .then(users => res.json(users));
} );

module.exports = router;

