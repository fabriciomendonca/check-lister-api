const {CheckListController} = require('../controllers/check-list');
const passportService = require('../services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', {session: false});

const checkListRoutes = (app) => {
  app.get('/check-lists', requireAuth, CheckListController.getList);
  app.get('/check-lists/:id', requireAuth, CheckListController.get);
  app.post('/check-lists', requireAuth, CheckListController.create);
  app.patch('/check-lists/:id', requireAuth, CheckListController.update);
  app.delete('/check-lists/:id', requireAuth, CheckListController.destroy);
}

module.exports = { checkListRoutes };
