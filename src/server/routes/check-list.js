const {CheckListController} = require('../controllers/check-list');

const checkListRoutes = (app) => {
  app.get('/check-lists', CheckListController.getList);
  app.get('/check-lists/:id', CheckListController.get);
  app.post('/check-lists', CheckListController.create);
  app.patch('/check-lists/:id', CheckListController.update);
  app.delete('/check-lists/:id', CheckListController.destroy);
}

module.exports = { checkListRoutes };
