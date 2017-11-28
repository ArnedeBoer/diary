module.exports = {
    up: (queryInterface, Sequelize) =>
        queryInterface.createTable('PagesPeople', {
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
            peopleid: {
                type: Sequelize.INTEGER,
                allowNull: false
            }
        }, {
            timestamps: false
        }),
    down: (queryInterface /*, Sequelize */) => queryInterface.dropTable('PagesPeople')
};
