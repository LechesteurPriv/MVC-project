const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  "freedb_music_player_db",
  "freedb_dbuser",
  "swdtY%TSqqar4?B",
  {
    host: "sql.freedb.tech",
    dialect: "mysql",
    port: 3306,
    logging: false,
  }
);

module.exports = sequelize;
