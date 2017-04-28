const router = require( 'express' ).Router();
const { User } = require( '../../db' );

router.get( '/', ( req, res, next ) => {
  User.create( {
      name: 'Test',
      password: 'test',
      email: 'test@test.test',
    } )
    .then( user => res.json( user ) )
    .catch( next );
} );

module.exports = router;

