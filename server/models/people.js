module.exports = (sequelize, DataTypes) => {
    const People = sequelize.define('People', {
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

    People.associate = (models) => {
        People.belongsTo(models.User, {
            foreignKey: 'userid',
            onDelete: 'CASCADE'
        });
    };

    return People;
};
