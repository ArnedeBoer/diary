module.exports = {
    up: (queryInterface, Sequelize) =>
        queryInterface.createTable('People', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            text: {
                type: Sequelize.TEXT,
                allowNull: true
            }
        }, {
            timestamps: false
        }),
    down: (queryInterface /*, Sequelize */) => queryInterface.dropTable('People')
};
