const router = require('express').Router();

router.use('/categories', require('./categories'));
router.use('/glasses', require('./glasses'));
router.use('/session', require('./session'));
router.use('/order', require('./order'));
router.use('/user', require('./user'));

module.exports = router;
