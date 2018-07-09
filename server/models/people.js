module.exports = (sequelize, DataTypes) => {
  const people = sequelize.define('people', {
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

  people.associate = models => {
    people.belongsToMany(models.pages, {
      through: models.pagespeople,
      foreignKey: 'peopleid'
    });
  };

  return people;
};
