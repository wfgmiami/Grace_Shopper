const router = require( 'express' ).Router();
const app = require('../app');

router.use( '/admin', require( './admin' ) );

router.use((req, res, next) => {
  res.locals = {
    jwtSecret: app.get('jwtSecret')
  };
  next();
});

router.use( '/categories', require( './categories' ) );
router.use( '/glasses', require( './glasses' ) );
router.use( '/session', require( './session' ) );
router.use( '/order', require( './order' ) );
router.use( '/user', require( './user' ) );

module.exports = router;

