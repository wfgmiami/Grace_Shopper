const router = require('express').Router();

router.use('/users', require('./users'));
router.use('/order', require('./order'));

module.exports = router;
