module.exports = {
    up: (queryInterface, Sequelize) =>
        queryInterface.createTable('Pages', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            date: {
                type: Sequelize.DATE,
                allowNull: false
            },
            text: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            userid: {
                type: Sequelize.INTEGER,
                onDelete: 'CASCADE',
                references: {
                    model: 'Users',
                    key: 'id',
                    as: 'userid'
                }
            }
        }, {
            timestamps: false
        }),
    down: (queryInterface /*, Sequelize */) => queryInterface.dropTable('Pages')
};
