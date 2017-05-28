const jwt = require('jwt-simple');
const User = require('../models/user');
const bcrypt = require('bcrypt-nodejs');

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({sub: user._id, iat: timestamp}, process.env.JWT_SECRET);
}

module.exports = {
  create (req, res, next) {
    const {
      email,
      password
    } = req.body;

    const user = new User({
      email,
      password
    });

    user.save()
      .then(data => {
        res.send({
          token: tokenForUser(data),
          email: data.email
        });
      })
      .catch(next);
  },

  signin (req, res, next) {
    const token = tokenForUser(req.user);
    res.status(200).send({
      token,
      email: req.user.email
    });
  }
}