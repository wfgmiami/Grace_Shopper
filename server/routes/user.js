const router = require( 'express' ).Router();
const { User } = require( '../../db' );
const jwt = require('jwt-simple');

router.post( '/', ( req, res, next ) => {
  const newUser = Object.keys( req.body ).filter( param => {
    return param === 'name' || param === 'password' || param === 'email';
  } ).reduce( ( memo, param ) => {
    memo[ param ] = req.body[ param ];
    return memo;
  }, {} );

  User.create( newUser )
    .then( user => {
      if (!user) return res.sendStatus( 401 );
      res.send( {
        token: jwt.encode( { id: user.id }, res.locals.jwtSecret )
      } );
    } )
    .catch( err => console.log(err) );
  } );

module.exports = router;
