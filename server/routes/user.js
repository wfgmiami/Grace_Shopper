const router = require( 'express' ).Router();
const { User } = require( '../../db' );

router.post( '/', ( req, res, next ) => {
  const newUser = Object.keys( req.body ).filter( param => {
    return param === 'name' || param === 'password' || param === 'email';
  } ).reduce( ( memo, param ) => {
    memo[ param ] = req.body[ param ];
    return memo;
  }, {} );


  User.create( newUser )
    .then( user => res.json( user ) )
    .catch( next );
} );

module.exports = router;

