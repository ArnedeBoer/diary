module.exports = {
    up: (queryInterface /*, Sequelize */) => {
        return queryInterface.bulkInsert('PagesLocations', [{
            pageid: 2,
            peopleid: 1
        },
        {
            pageid: 4,
            peopleid: 1
        },
        {
            pageid: 4,
            peopleid: 2
        }], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('PagesLocations', null, {});
    }
};
