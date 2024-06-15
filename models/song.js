const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Song = sequelize.define(
  "Song",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fileName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    file_data: {
      type: DataTypes.BLOB,
      allowNull: false,
    },
  },
  {
    tableName: "Songs",
  }
);

module.exports = {
  Song,
  sequelize,
};
