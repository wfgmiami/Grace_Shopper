const router = require( 'express' ).Router();
const { models } = require( '../../db' );

router.get( '/', ( req, res, next ) => {
  models.users.create( {
      name: 'Test',
      password: 'test',
      email: 'test@test.test',
    } )
    .then( user => res.json( user ) )
    .catch( next );
} );

module.exports = router;

