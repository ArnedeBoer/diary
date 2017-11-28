module.exports = {
    up: (queryInterface /*, Sequelize */) => {
        return queryInterface.bulkInsert('Pages', [{
            date: '2017-01-01',
            text: 'This is in Januari.'
        },
        {
            date: '2017-02-02',
            text: 'This is in Februari.'
        },
        {
            date: '2017-03-03',
            text: 'This is in March.'
        },
        {
            date: '2017-04-04',
            text: 'This is in April.'
        }], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Pages', null, {});
    }
};
