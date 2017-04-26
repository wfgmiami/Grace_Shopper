const router = require( 'express' ).Router();
const models = require( '../../db/models' );
const jwt = require( 'jwt-simple' );
const secret = process.env.SECRET || '1701-FLX-NY';

module.exports = router;

router.post( '/', ( req, res, next ) => {
  const { name, password } = req.body;
  models.User.findByPassword( { name, password } )
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
    models.User.findById( token.id )
      .then( user => {
        if ( !user ) return res.sendStatus( 401 );

        res.send( user );
      } );
  } catch ( err ) {
    console.log( err.stack );
    res.sendStatus( 500 );
  }
} );

