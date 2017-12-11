module.exports = (sequelize, DataTypes) => {
    const Page = sequelize.define('Page', {
        date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        text: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    }, {
        timestamps: false
    });

    Page.associate = models => {
        Page.belongsTo(models.User, {
            foreignKey: 'userid',
            onDelete: 'CASCADE'
        });

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
