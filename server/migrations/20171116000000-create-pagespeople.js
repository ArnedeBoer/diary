module.exports = {
    up: (queryInterface, Sequelize) =>
        queryInterface.createTable('PagesPeople', {
            pageid: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            peopleid: {
                type: Sequelize.INTEGER,
                allowNull: false
            }
        }, {
            timestamps: false
        }),
    down: (queryInterface /*, Sequelize */) => queryInterface.dropTable('PagesPeople')
};