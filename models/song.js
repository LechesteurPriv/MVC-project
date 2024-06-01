module.exports = (sequelize, DataTypes) => {
    const Song = sequelize.define('Song', {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        filename: {
            type: DataTypes.STRING,
            allowNull: false
        },
        category: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });

    return Song;
};
