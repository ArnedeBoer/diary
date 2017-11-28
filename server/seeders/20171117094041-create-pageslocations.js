module.exports = {
    up: (queryInterface /*, Sequelize */) => {
        return queryInterface.bulkInsert('PagesLocations', [{
            pageid: 3,
            locationid: 1
        },
        {
            pageid: 4,
            locationid: 1
        },
        {
            pageid: 4,
            locationid: 2
        }], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('PagesLocations', null, {});
    }
};
