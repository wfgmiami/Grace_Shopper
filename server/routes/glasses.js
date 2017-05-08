const router = require( 'express' ).Router();
const { Glasses } = require( '../../db' );

router.get( '/search', ( req, res, next ) => {
  console.log( 'search query', req.query.name );

  Glasses.findAll( {
      where: {
        name: { $iLike: `%${req.query.name}%` }
      }
    } )
    .then( glasses => res.json( glasses ) )
    .catch( next );
} );

router.get( '/detail/:id', ( req, res, next ) => {
  console.log( 'Selected Glass: ', req.params.id );
  Glasses.scope( 'categories' ).findById( req.params.id )
    .then( glass => res.json( glass ) );
} );

router.get( '/:offset', ( req, res, next ) => {
  const offset = ( req.params.offset - 1 ) * 15;
  if ( Object.keys( req.query ).length ) {
    Glasses.getWithCategories( offset, req.query )
      .then( glasses => res.json( { count: 15, glasses } ) );
  } else {
    let count;
    Glasses.count()
      .then( _count => { count = _count; } )
      .then( () => Glasses.scope( 'categories' ).findAll( { offset, limit: 15 } ) )
      .then( glasses => res.json( { count, glasses } ) );
  }
} );


module.exports = router;

