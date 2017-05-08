const router = require( 'express' ).Router();
const { User } = require('../../../db');

router.use( ( req, res, next ) => {
  res.locals = {
    isAdmin: function isAdmin( req ) {
      return User.findById( req.userId )
        .then( user => {
          if ( !user.isAdmin ) throw new Error( 'User is not an admin' );
          return user.isAdmin;
        } );
    }
  };
  next();
} );

router.use( '/users', require( './users' ) );
router.use( '/order', require( './order' ) );

router.use( ( err, req, res, next ) => {
  console.log(chalk.red(err.message));
  if ( err.message === 'User is not an admin' || err.message === 'Not enough or too many segments' ) res.sendStatus( 401 );
  next( err );
} );

module.exports = router;

