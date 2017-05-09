const router = require('express').Router();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../../../db/models/User');

const Order = require('../../../db/models/Order');

passport.use(
  new GoogleStrategy({

    // localhost credentials
    clientID:
    '996228923588-ma414rr4i6oumg6939tsv45kcn95imv4.apps.googleusercontent.com', // these should be in a secret .gitignore'ed file. Not on github for all peoples to see. You could do like what you did in app-variables and set them in production in heroku! (I can help if you don't know how to do this)
    clientSecret: '4XCnWYcRyxxeb3Xmldy_lIrF',
    callbackURL: '/api/auth/google/verify'

    // http://grace-shopper.herokuapp.com credentials
    // clientID:
    // '996228923588-5n2dv3lkb3td717c3llm0seh36n4bmgj.apps.googleusercontent.com',
    // clientSecret: 'ovEQE8jpRPn0nK0xQSQGgs4w',
    // callbackURL: '/api/auth/google/verify'
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
      Order.findOrCreate({ // you are probably going to want to do this here and maybe when you change an order from Pending to anything else? If so, maybe a user instance method makes more sense?
          where: { userId: user.id },
          defaults: { userId: this.id, status: 'Pending' }
      }) // this is async -- don't call `done` until you are sure this is finished
      done(null, user)
    })
    .catch(done);
  })
)

router.get('/', passport.authenticate('google', { scope: 'email' }))

router.get('/verify', passport.authenticate('google', {
   failureRedirect: '/', // maybe go to the login page again with an error message
   successRedirect: '/' // maybe go to the user's home page!
}));

module.exports = router;
