module.exports = (sequelize, DataTypes) => {
  const Page = sequelize.define('Page', {
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    people: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true
    },
    locations: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true
    }
  });

  Page.associate = (models) => {
    Page.belongsTo(models.User, {
      foreignKey: 'userid',
      onDelete: 'CASCADE'
    });
  };

  return Page;
};
