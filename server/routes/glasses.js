const router = require( 'express' ).Router();
const { models } = require( '../../db' );

router.get( '/:start', ( req, res, next ) => {
  const start = ( req.params.start - 1 ) * 15;
  models.glasses.findAll( { start, limit: 15 } )
    .then( glasses => res.json( glasses ) );
} );

router.get( '/test', ( req, res, next ) => {
  // models.glasses.getWithCategories()
  // .then( glasses => {
  //   console.log( glasses.length );
  //   res.json( glasses );
  // } );

  models.glasses.findAll( {
      include: [ {
        model: models.categories,
        where: {
          name: 'color',
          value: 'Black'
        },
        attributes: [ 'value' ],
        as: 'color'
      }, {
        model: models.categories,
        where: {
          $or: [ {
            name: 'ideal_face_shape',
            value: 'Round'
          }, {
            name: 'ideal_face_shape',
            value: 'Oval'
          } ]
        },
        attributes: [ 'value' ],
        as: 'ideal_face_shape'
      } ]
    } )
    .then( glasses => res.json( glasses ) );
} );

module.exports = router;

