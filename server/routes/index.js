const usersController = require('../controllers').users;
const pagesController = require('../controllers').pages;
const peopleController = require('../controllers').people;
const locationsController = require('../controllers').locations;
const sessionsController = require('../controllers').sessions;

module.exports = app => {
    app.post('/api/user/create', usersController.create);
    app.post('/api/user/login', usersController.login);

    app.post('/api/pages/create/:userid', pagesController.create);
    app.post('/api/pages/filter', pagesController.filter);
    app.post('/api/pages/edit', pagesController.edit);

    app.post('/api/people/create/:userid', peopleController.create);
    app.post('/api/people/filter', peopleController.filter);
    app.post('/api/people/edit', peopleController.edit);
    
    app.post('/api/locations/create/:userid', locationsController.create);
    app.post('/api/locations/filter', locationsController.filter);
    app.post('/api/locations/edit', locationsController.edit);

    app.post('/api/sessions/verify', sessionsController.verify);
};
