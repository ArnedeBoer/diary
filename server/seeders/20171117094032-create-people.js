module.exports = {
    up: (queryInterface /*, Sequelize */) => {
        return queryInterface.bulkInsert('People', [{
            name: 'Bob',
            text: 'This guy builds.',
            userid: 1
        },
        {
            name: 'Chris',
            text: 'Loves rollercoasters.',
            userid: 1
        }], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('People', null, {});
    }
};
