const itemsController = require('../controllers').items;

module.exports = app => {
  app.post('/api/create', itemsController.create);
  app.post('/api/filter', itemsController.filter);
  app.post('/api/edit', itemsController.edit);
  app.post('/api/delete', itemsController.delete);
};
