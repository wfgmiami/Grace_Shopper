const router = require('express').Router();
const User = require('../../../db/models/User');


// api/auth/me
router.get('/', function (req, res, next) {
  res.json(req.user);
});

router.delete('/', function (req, res) {
  req.logOut();
  res.sendStatus(204);
});

module.exports = router;
