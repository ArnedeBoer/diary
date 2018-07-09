module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('pages', {
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
      description: {
        type: Sequelize.TEXT,
        allowNull: false
      }
    }, {
      timestamps: false
    }),
  down: (queryInterface /*, Sequelize */) => queryInterface.dropTable('pages')
};
