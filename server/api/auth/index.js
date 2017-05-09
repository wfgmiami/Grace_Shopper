const router = require('express').Router();
const meRouter = require('./me');
const googleRouter = require('./google');

router.use('/me', meRouter);
router.use('/google', googleRouter);
// what about local auth strategy? Without Oauth?

module.exports = router;
