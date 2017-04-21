const router = require('express').Router();

router.use('/categories', require('./categories'));
router.use('/glasses', require('./glasses'));

module.exports = router;
