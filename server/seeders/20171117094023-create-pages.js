module.exports = {
    up: (queryInterface /*, Sequelize */) => {
        return queryInterface.bulkInsert('Pages', [{
            date: '2017-01-01',
            text: 'This is in Januari.',
            people: null,
            locations: null
        },
        {
            date: '2017-02-02',
            text: 'This is in Februari.',
            people: ['Bob'],
            locations: null
        },
        {
            date: '2017-03-03',
            text: 'This is in March.',
            people: null,
            locations: ['Cafe Bax']
        },
        {
            date: '2017-04-04',
            text: 'This is in April.',
            people: ['Bob', 'Chris'],
            locations: ['Cafe Bax', 'Cafe Lennep']
        }], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Pages', null, {});
    }
};
