module.exports = {
    up: (queryInterface /*, Sequelize */) => {
        return queryInterface.bulkInsert('Users', [{
            username: 'admin',
            password: 'admin',
            displayname: 'admin'
        }], {});
    },

    down: (queryInterface /*, Sequelize */) => {
        return queryInterface.bulkDelete('Users', null, {});
    }
};
