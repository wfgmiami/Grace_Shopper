const router = require( 'express' ).Router();
const { models } = require( '../../db' );

router.get( '/', ( req, res, next ) => {
  models.categories.findAll( {} )
    .then( categories => res.json( categories ) )
    .catch( next );
} );

module.exports = router;

