module.exports = (sequelize, DataTypes) => {
    const PagesLocations = sequelize.define('PagesLocations', {}, {
        timestamps: false
    });

    return PagesLocations;
};
