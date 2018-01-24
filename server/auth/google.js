const passport = require('passport');
const router = require('express').Router();
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const { User } = require('../db/models');
module.exports = router;

const googleConnectConfig = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CONNECT_CALLBACK,
};

const googleLoginConfig = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_LOGIN_CALLBACK,
};

const connectStrategy = new GoogleStrategy(googleConnectConfig, async (token, refreshToken, profile, done) => {
  const googleId = profile.id;
  const email = profile.emails[0].value;
  try {
    const user = await User.find({ where: { email } });
    const updatedUser = await user.update({ googleId });
    done(null, updatedUser);
  }
  catch (err) { done(err); }
});

const loginStrategy = new GoogleStrategy(googleLoginConfig, async (token, refreshToken, profile, done) => {
  const googleId = profile.id;
  try {
    const user = await User.find({ where: { googleId } });
    if (user) done(null, user);
    else done(null, null);
  }
  catch (err) { done(err); }
});

passport.use('google-connect', connectStrategy);
passport.use('google-login', loginStrategy);

router.get('/connect', passport.authenticate('google-connect', { scope: 'email' }));
router.get('/login', passport.authenticate('google-login', { scope: 'email' }));
router.get('/callback/connect', passport.authenticate('google-connect', {
  successRedirect: '/home',
  failureRedirect: '/account',
}));
router.get('/callback/login', passport.authenticate('google-login', {
  successRedirect: '/home',
  failureRedirect: '/login',
}));
