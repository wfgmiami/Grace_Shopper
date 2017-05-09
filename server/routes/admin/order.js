const router = require( 'express' ).Router();
const { User, Order } = require( '../../../db' );
const chalk = require('chalk');

module.exports = router;

router.get( '/', (req, res, next) => {
  res.sendStatus(401);
} );

require('../../configure/admin-middleware')(router);


router.get( '/:token', ( req, res, next ) => { // Interesting! Why not use passport to help you? If this person is logged in via passport (local or Oauth strategy), we can check if the req.user (what we get after logging someone in via passport) - if the req.user.isAdmin == true basically. Or am I misunderstanding what you are doing?
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
    .then( () => Order.findOne( { where: { id: req.params.orderId } } ) ) // use findById
    .then( order => { // to get this on 1 line you could look at order.update({status: req.body.status})
      order.status = req.body.status;
      return order.save();
    } )
    .then( order => res.json( order ) )
    .catch( next );
} );
