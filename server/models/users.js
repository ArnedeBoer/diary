module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validation: {
                len: { args: 8 }
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validation: {
                len: { args: 8 }
            }
        },
        displayname: {
            type: DataTypes.STRING,
            allowNull: false,
            validation: {
                len: { args: 8 }
            }
        }
    }, {
        timestamps: false
    });

    User.associate = models => {
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

        User.hasMany(models.Sessions, {
            foreignKey: 'userid',
            as: 'sessions'
        });
    };

    return User;
};
