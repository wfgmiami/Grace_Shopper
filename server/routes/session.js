const router = require( 'express' ).Router();
const models = require( '../../db/models' );
const jwt = require( 'jwt-simple' );
const secret = process.env.SECRET || '1701-FLX-NY';

module.exports = router;

router.post( '/', ( req, res, next ) => {
  models.User.findByPassword( {
      name: req.body.name,
      password: req.body.password
    } )
    .then( user => {
      if ( user ) {
        const token = jwt.encode( { id: user.id }, secret );
        return res.send( { token } );
      }
      return res.sendStatus( 401 );
    } )
    .catch( next );
} );

router.get( '/:token', ( req, res, next ) => {
  try {
    const token = jwt.decode( req.params.token, secret );
    models.User.findById( token.id )
      .then( user => {
        if ( !user ) {
          return res.sendStatus( 401 );
        }
        res.send( user );
      } );
  } catch ( err ) {
    console.log( err.stack );
    res.sendStatus( 500 );
  }
} );

