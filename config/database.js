const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  //"freedb_music_player_db",
    "defaultdb",
  //"freedb_muser",
    "avnadmin",
  //"72!Ax3NNSRv49aD",
    "AVNS_wyaqKSaitVa2yo1rMoP",
  {
   // host: "sql.freedb.tech",
    host: "sql7714081-piotrek-1ee6.g.aivencloud.com",
    dialect: "mysql",
    port: 25972,
    logging: false,
  }
);

module.exports = sequelize;
