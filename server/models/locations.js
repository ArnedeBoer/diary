module.exports = (sequelize, DataTypes) => {
    const Locations = sequelize.define('Locations', {
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

    Locations.associate = models => {
        Locations.belongsToMany(models.Page, {
            through: models.PagesLocations,
            foreignKey: 'locationid'
        });
    };

    return Locations;
};
