const router = require('express').Router();

router.use('/categories', require('./categories'));
router.use('/glasses', require('./glasses'));
router.use('/session', require('./session'));

module.exports = router;
