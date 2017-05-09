const jwt = require('jwt-simple');

const app = require('../app');


module.exports = router => {
  router.use( '/:token', ( req, res, next ) => {
    let err;
    try {
      req.userId = jwt.decode( req.params.token, app.get('jwtSecret') ).id;
      err = null;
    } catch (_err) {
      err = _err;
    } finally {
      next(err);
    }
  } );
};
