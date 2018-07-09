module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('locations', {
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
      description: {
        type: Sequelize.TEXT,
        allowNull: true
      }
    }, {
      timestamps: false
    }),
  down: (queryInterface /*, Sequelize */) => queryInterface.dropTable('locations')
};
