const router = require( 'express' ).Router();
const { models } = require( '../../db' );

router.get( '/:start', ( req, res, next ) => {
  const start = ( req.params.start - 1 ) * 15;
  models.glasses.scope('categories').findAll( {start, limit: 15 } )
    .then( glasses => res.json( glasses ) );
} );

module.exports = router;

