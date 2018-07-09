module.exports = (sequelize, DataTypes) => {
  const pageslocations = sequelize.define('pageslocations', {}, {
    timestamps: false
  });

  return pageslocations;
};
