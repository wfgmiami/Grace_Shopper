const router = require( 'express' ).Router();
const { User } = require( '../../db' );
const jwt = require( 'jwt-simple' );

module.exports = router;

router.post( '/', ( req, res, next ) => {
  const { name, password } = req.body;
  User.findByPassword( { name, password } ) // why is this a find if we are in a post?
    .then( user => {
      if (!user) return res.sendStatus( 401 ); // return here works, or an else statement for the next response

      res.send( {
        token: jwt.encode( { id: user.id }, res.locals.jwtSecret )
      } ); // didn't have a chance to look at your frontend, but I want to make sure that you are thinking about storing the token on the front even with a refresh

    } )
    .catch( next );
} );

router.get( '/:token', ( req, res, next ) => {
  try {
    const token = jwt.decode( req.params.token, res.locals.jwtSecret );
    User.findById( token.id )
      .then( user => {
        if ( !user ) return res.sendStatus( 401 ); // return here works, or an else statement for the next response

        res.send( user );
      } );
  } catch ( err ) { // use next!
    console.log( err.stack );
    res.sendStatus( 500 );
  }
} );

