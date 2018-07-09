module.exports = (sequelize, DataTypes) => {
  const pagespeople = sequelize.define('pagespeople', {}, {
    timestamps: false
  });

  return pagespeople;
};
