module.exports = {
    up: (queryInterface /*, Sequelize */) => {
        return queryInterface.bulkInsert('People', [{
            name: 'Bob',
            text: 'This guy builds.'
        },
        {
            name: 'Chris',
            text: 'Loves rollercoasters.'
        }], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('People', null, {});
    }
};
