module.exports = {
    up: (queryInterface /*, Sequelize */) => {
        return queryInterface.bulkInsert('Users', [{
            username: 'adminadmin',
            password: 'adminadmin',
            displayname: 'adminadmin'
        }], {});
    },

    down: (queryInterface /*, Sequelize */) => {
        return queryInterface.bulkDelete('Users', null, {});
    }
};
