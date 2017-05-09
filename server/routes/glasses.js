const router = require( 'express' ).Router();
const { Glasses } = require( '../../db' );

router.get( '/search', ( req, res, next ) => { // why not just `/` instead of `/search`. This should already return all glasses if there is no query.name right? Or no?
  console.log( 'search query', req.query.name ); // logs in master... :)

  Glasses.findAll( {
      where: {
        name: { $iLike: `%${req.query.name}%` }
      }
    } )
    .then( glasses => res.json( glasses ) )
    .catch( next );
} );

router.get( '/detail/:id', ( req, res, next ) => { // why `/detail/:id` why not just `/:id`?
  console.log( 'Selected Glass: ', req.params.id );
  Glasses.scope( 'categories' ).findById( req.params.id )
    .then( glass => res.json( glass ) );
} );

router.get( '/:offset', ( req, res, next ) => {
  const offset = ( req.params.offset - 1 ) * 15; // ?! This might be a nice place for a descriptive comment?
  if ( Object.keys( req.query ).length ) {
    Glasses.getWithCategories( offset, req.query ) // what is going on here? I don't think I understood this method.. :D
      .then( glasses => res.json( { count: 15, glasses } ) );
  } else {
    let count;
    Glasses.count() // could this be done at the same time as the findAll? Maybe consider Promise.all?
      .then( _count => { count = _count; } )
      .then( () => Glasses.scope( 'categories' ).findAll( { offset, limit: 15 } ) )
      .then( glasses => res.json( { count, glasses } ) );
  }
} );


module.exports = router;

