const router = require( 'express' ).Router();
const { models } = require( '../../db' );

router.get( '/:offset', ( req, res, next ) => {
  const offset = ( req.params.offset - 1 ) * 15;
  if ( Object.keys( req.query ).length ) {
    models.glasses.getWithCategories( offset, req.query )
      .then( glasses => res.json( { count: 15, glasses } ) );
  } else {
    let count;
    models.glasses.count()
      .then( _count => { count = _count; } )
      .then( () => models.glasses.scope( 'categories' ).findAll( { offset, limit: 15 } ) )
      .then( glasses => res.json( { count, glasses } ) );
  }
} );

module.exports = router;

