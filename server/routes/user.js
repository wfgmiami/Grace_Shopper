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
  // const {name, password, email} = req.body // consider object destructuring!
  // User.create({name, password, email})
  User.create( newUser )
    .then( user => {
      if (!user) return res.sendStatus( 401 ); // why are you sending a 401?
      res.send( {
        token: jwt.encode( { id: user.id }, res.locals.jwtSecret )
      } );
    } )
    .catch( err => console.log(err) ); // you have to send a response for every request!!! Use `next`
  } );

module.exports = router;
