module.exports = {
    up: (queryInterface /*, Sequelize */) => {
        return queryInterface.bulkInsert('Locations', [{
            name: 'Cafe Bax',
            text: 'Nice beers.',
            userid: 1
        },
        {
            name: 'Cafe Lennep',
            text: 'Waterside terrace.',
            userid: 1
        }], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Locations', null, {});
    }
};
