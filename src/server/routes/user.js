const UserController = require('../controllers/user');
const passport = require('passport');

const requireSignin = passport.authenticate('local', {session: false});

module.exports = {
  userRoutes(app) {
    app.post('/users/signin', requireSignin, UserController.signin)
    app.post('/users', UserController.create);
  }
}