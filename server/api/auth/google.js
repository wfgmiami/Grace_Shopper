const router = require('express').Router();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../../../db/models/User');

const Order = require('../../../db/models/Order');

passport.use(
  new GoogleStrategy({
    clientID:
    '996228923588-ma414rr4i6oumg6939tsv45kcn95imv4.apps.googleusercontent.com',
    clientSecret: '4XCnWYcRyxxeb3Xmldy_lIrF',
    callbackURL: '/api/auth/google/verify'
  },
  function verificationCallback(token, refreshToken, profile, done){
    let info = {
      name: profile.displayName,
      email: profile.emails[0].value,
      password: profile.id
    };

    User.findOrCreate({
      where: { googleId: profile.id},
      defaults: info
    })
    .spread( user => {
      Order.findOrCreate({
          where: { userId: user.id },
          defaults: { userId: this.id, status: 'Pending' }
      })
      done(null, user)
    })
    .catch(done);
  })
)

router.get('/', passport.authenticate('google', { scope: 'email' }))

router.get('/verify', passport.authenticate('google', {
   failureRedirect: '/',
   successRedirect: '/'
}));

module.exports = router;
