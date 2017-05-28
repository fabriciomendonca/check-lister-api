const UserController = require('../controllers/user');

module.exports = {
  userRoutes(app) {
    app.post('/users', UserController.create);
  }
}