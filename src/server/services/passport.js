const passport = require('passport');
const User = require('../models/user');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

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
