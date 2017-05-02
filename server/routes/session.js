const router = require( 'express' ).Router();
const { User } = require( '../../db' );
const jwt = require( 'jwt-simple' );
const secret = process.env.SECRET || '1701-FLX-NY';

module.exports = router;

router.post( '/', ( req, res, next ) => {
  const { name, password } = req.body;
  User.findByPassword( { name, password } )
    .then( user => {
      if (!user) return res.sendStatus( 401 );

      res.send( {
        token: jwt.encode( { id: user.id }, secret )
      } );

    } )
    .catch( next );
} );

router.get( '/:token', ( req, res, next ) => {
  try {
    const token = jwt.decode( req.params.token, secret );
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

