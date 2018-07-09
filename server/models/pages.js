module.exports = (sequelize, DataTypes) => {
  const pages = sequelize.define('pages', {
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  }, {
    timestamps: false
  });

  pages.associate = models => {
    pages.belongsToMany(models.locations, {
      through: models.pageslocations,
      foreignKey: 'pageid',
      as: 'locations'
    });

    pages.belongsToMany(models.people, {
      through: models.pagespeople,
      foreignKey: 'pageid',
      as: 'people'
    });
  };

  return pages;
};
