const router = require( 'express' ).Router();
const { User } = require( '../../db' );
const jwt = require( 'jwt-simple' );

module.exports = router;

router.post( '/', ( req, res, next ) => {
  const { name, password } = req.body;
  User.findByPassword( { name, password } )
    .then( user => {
      if (!user) return res.sendStatus( 401 );

      res.send( {
        token: jwt.encode( { id: user.id }, res.locals.jwtSecret )
      } );

    } )
    .catch( next );
} );

router.get( '/:token', ( req, res, next ) => {
  try {
    const token = jwt.decode( req.params.token, res.locals.jwtSecret );
    User.findById( token.id )
      .then( user => {
        if ( !user ) return res.sendStatus( 401 );

        res.send( user );
      } );
  } catch ( err ) {
    console.log( err.stack );
    res.sendStatus( 500 );
  }
} );

