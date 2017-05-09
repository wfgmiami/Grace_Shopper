const router = require( 'express' ).Router();
const { User, Order } = require( '../../../db' );
const chalk = require('chalk');

module.exports = router;

router.get( '/', (req, res, next) => {
  res.sendStatus(401);
} );

require('../../configure/admin-middleware')(router);


router.get( '/:token', ( req, res, next ) => {
  res.locals.isAdmin( req )
    .then( () => Order
      .scope( req.query.scope || 'all' )
      .findAll( { include: [ User ] } )
    )
    .then( orders => res.json( orders ) )
    .catch( next );
} );

router.put( '/:token/:orderId', ( req, res, next ) => {
  res.locals.isAdmin( req )
    .then( () => Order.findOne( { where: { id: req.params.orderId } } ) )
    .then( order => {
      order.status = req.body.status;
      return order.save();
    } )
    .then( order => res.json( order ) )
    .catch( next );
} );
