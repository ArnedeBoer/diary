module.exports = {
    up: (queryInterface, Sequelize) =>
        queryInterface.createTable('PagesLocations', {
            pageid: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            locationid: {
                type: Sequelize.INTEGER,
                allowNull: false
            }
        }, {
            timestamps: false
        }),
    down: (queryInterface /*, Sequelize */) => queryInterface.dropTable('PagesLocations')
};
