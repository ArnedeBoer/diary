module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        displayname: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    User.associate = (models) => {
        User.hasMany(models.Page, {
            foreignKey: 'userid',
            as: 'pages'
        });

        User.hasMany(models.People, {
            foreignKey: 'userid',
            as: 'people'
        });

        User.hasMany(models.Locations, {
            foreignKey: 'userid',
            as: 'locations'
        });
    };

    return User;
};
