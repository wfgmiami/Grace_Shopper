const router = require( 'express' ).Router();
const { models } = require( '../../db' );

router.get( '/:id', ( req, res, next ) => {
  models.orders.findById( req.params.id, {
    include: [ models.glasses, models.users ]
  } )
  .then( order => res.json( order ) )
  .catch( next );
} );

module.exports = router;

