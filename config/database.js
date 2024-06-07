const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  "freedb_music_player_db",
  "freedb_muser",
  "72!Ax3NNSRv49aD",
  {
    host: "sql.freedb.tech",
    dialect: "mysql",
    port: 3306,
    logging: false,
  }
);

module.exports = sequelize;
