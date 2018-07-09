module.exports = (sequelize, DataTypes) => {
  const locations = sequelize.define('locations', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  }, {
    timestamps: false
  });

  locations.associate = models => {
    locations.belongsToMany(models.pages, {
      through: models.pageslocations,
      foreignKey: 'locationid'
    });
  };

  return locations;
};
