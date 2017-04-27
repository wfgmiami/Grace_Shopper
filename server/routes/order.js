const router = require( 'express' ).Router();
const { models } = require( '../../db' );
const jwt = require( 'jwt-simple' );
const secret = process.env.SECRET || '1701-FLX-NY';

router.get( '/:id', ( req, res, next ) => {
  models.orders.findById( req.params.id, {
      include: [ models.glasses, models.users ]
    } )
    .then( order => res.json( order ) )
    .catch( next );
} );

router.use( '/pending/:token', ( req, res, next ) => {
  req.userId = jwt.decode( req.params.token, secret ).id;
  next();
} );

router.get( '/pending/:token', ( req, res, next ) => {
  const { userId } = req;
  models.orders.scope( 'pending' ).findOne( { where: { userId } } )
    .then( order => res.json( order.get().glasses ) )
    .catch( next );
} );

router.post( '/pending/:token', ( req, res, next ) => {
  const { userId, body: { cart } } = req;
  Promise.all( [
      models.orders.scope( 'pending' ).findOne( { where: { userId } } ),
    ].concat( req.body.cart.map( glasses => models.glasses.findById( glasses.id ) ) ) )
    .then( ( [ order, ...glasses ] ) => Promise.all(
      glasses.map( ( glass, idx ) => order.addGlass( glass, { quantity: cart[ idx ].quantity, price: 100, date: new Date() }, { updatesOnDuplicate: true } ) )
    ) )
    .then( () => res.sendStatus( 201 ) )
    .catch( next );
} );

module.exports = router;

