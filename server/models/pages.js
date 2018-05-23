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
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    }, {
        timestamps: false
    });

    Page.associate = models => {
        Page.belongsToMany(models.Locations, {
            through: models.PagesLocations,
            foreignKey: 'pageid',
            as: 'locations'
        });

        Page.belongsToMany(models.People, {
            through: models.PagesPeople,
            foreignKey: 'pageid',
            as: 'people'
        });
    };

    return Page;
};
