const usersController = require('../controllers').users;
const pagesController = require('../controllers').pages;
const peopleController = require('../controllers').people;
const locationsController = require('../controllers').locations;

module.exports = app => {
    app.get('/api/user/all', usersController.list);
    app.get('/api/user/:userid', usersController.retrieve);
    app.get('/api/user/find/:username', usersController.findByUsername);
    app.post('/api/user/create', usersController.create);

    app.get('/api/page/all', pagesController.list);
    app.post('/api/page/filter', pagesController.filter);
    app.get('/api/page/:pageid', pagesController.retrieve);
    app.post('/api/page/create/:userid', pagesController.create);
    app.post('/api/page/edit', pagesController.edit);

    app.post('/api/people/create/:userid', peopleController.create);
    app.post('/api/people/filter', peopleController.filter);
    app.post('/api/people/edit', peopleController.edit);
    
    app.post('/api/locations/create/:userid', locationsController.create);
    app.post('/api/locations/filter', locationsController.filter);
    app.post('/api/locations/edit', locationsController.edit);
};
