module.exports = (sequelize, DataTypes) => {
    const Locations = sequelize.define('Locations', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        text: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    }, {
        timestamps: false
    });

    Locations.associate = (models) => {
        Locations.belongsTo(models.User, {
            foreignKey: 'userid',
            onDelete: 'CASCADE'
        });
    };

    return Locations;
};
