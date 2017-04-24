const router = require('express').Router();
const { models } = require('../../db');

router.get('/', (req, res, next) => {
  models.glasses.findAll({ order: 'name' })
    .then(glasses => res.json(glasses));
});

module.exports = router;
