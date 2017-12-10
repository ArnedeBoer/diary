module.exports = {
    up: (queryInterface /*, Sequelize */) => {
        return queryInterface.bulkInsert('Pages', [{
            date: '2017-01-01',
            text: 'This is in Januari.',
            userid: 1
        },
        {
            date: '2017-02-02',
            text: 'This is in Februari.',
            userid: 1
        },
        {
            date: '2017-03-03',
            text: 'This is in March.',
            userid: 1
        },
        {
            date: '2017-04-04',
            text: 'This is in April.',
            userid: 1
        }], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Pages', null, {});
    }
};
