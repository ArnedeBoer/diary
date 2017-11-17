module.exports = {
    up: (queryInterface /*, Sequelize */) => {
        return queryInterface.bulkInsert('Locations', [{
            name: 'Cafe Bax',
            text: 'Nice beers.'
        },
        {
            name: 'Cafe Lennep',
            text: 'Waterside terrace.'
        }], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Locations', null, {});
    }
};
