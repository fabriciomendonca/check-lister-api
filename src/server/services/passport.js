const passport = require('passport');
const User = require('../models/user');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

const localOptions = {
  usernameField: 'email'
};

const localStrategy = new LocalStrategy(localOptions, function(email, password, done) {
  User.findOne({ email })
    .then(user => {
      if (!user) {
        return done(null, false);
      }

      user.validatePassword(password, function(err, isMatch) {
        if (err) {
          return done(err);
        }

        if (!isMatch) {
          return done(null, isMatch);
        }

        done(null, user);
      });
    })
    .catch((err) => done(err));
});

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: process.env.JWT_SECRET
};

const strategyAuthenticated = new JwtStrategy(jwtOptions, function(payload, done) {
  User.findById(payload.sub)
    .then(user => {
      return user ? done(null, user) : done(null, false);
    })
    .catch(err => done(err, false));
})

passport.use(strategyAuthenticated);
passport.use(localStrategy);
