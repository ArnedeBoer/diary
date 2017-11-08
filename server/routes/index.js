const usersController = require('../controllers').users;
const pagesController = require('../controllers').pages;

module.exports = app => {
    app.get('/api/user/all', usersController.list);
    app.get('/api/user/:userid', usersController.retrieve);
    app.get('/api/user/find/:username', usersController.findByUsername);
    app.post('/api/user/create', usersController.create);

    app.get('/api/page/all', pagesController.list);
    app.post('/api/page/filter', pagesController.filter);
    app.get('/api/page/:pageid', pagesController.retrieve);
    app.post('/api/page/create/:userid', pagesController.create);
};
