module.exports = (sequelize, DataTypes) => {
    const People = sequelize.define('People', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        text: {
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

    People.associate = models => {
        People.belongsToMany(models.Page, {
            through: models.PagesPeople,
            foreignKey: 'peopleid'
        });
    };

    return People;
};
