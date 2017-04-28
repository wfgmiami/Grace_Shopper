const router = require( 'express' ).Router();
const { Category } = require( '../../db' );

router.get( '/', ( req, res, next ) => {
  Category.findAll( {} )
    .then( categories => res.json( categories ) )
    .catch( next );
} );

module.exports = router;

