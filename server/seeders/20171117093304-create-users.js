module.exports = {
    up: (queryInterface /*, Sequelize */) => {
        return queryInterface.bulkInsert('Users', [{
            username: 'arne',
            password: 'arne',
            displayname: 'Arne'
        }], {});
    },

    down: (queryInterface /*, Sequelize */) => {
        return queryInterface.bulkDelete('Users', null, {});
    }
};
