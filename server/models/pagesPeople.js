module.exports = (sequelize, DataTypes) => {
    const PagesPeople = sequelize.define('PagesPeople', {}, {
        timestamps: false
    });

    return PagesPeople;
};
