module.exports = {
    up: (queryInterface, Sequelize) =>
        queryInterface.createTable('PagesLocations', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
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
