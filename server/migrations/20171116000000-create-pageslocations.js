module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('pageslocations', {
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
  down: (queryInterface /*, Sequelize */) => queryInterface.dropTable('pageslocations')
};
