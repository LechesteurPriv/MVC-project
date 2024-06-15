const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  "mvp_project",
  "kcessak_mvp",
  "72!Ax3NNSRv49aD",
  {
    host: "kcessak-aeh.database.windows.net",
    dialect: "mssql",
    port: 1433,
    dialectOptions: {
      encrypt: true, // Upewnij się, że SSL jest włączony
      packetSize: 32768,
    },
  }
);

module.exports = sequelize;
