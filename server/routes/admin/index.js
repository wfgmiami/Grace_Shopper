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

router.use( ( err, req, res, next ) => { // I think you could make your one error handler dynamic to handle all of these things
  console.log(chalk.red(err.message));
  if ( err.message === 'User is not an admin' || err.message === 'Not enough or too many segments' ) res.sendStatus( 401 );
  next( err ); // you should not call next if you have sent your response already!
} );

module.exports = router;

