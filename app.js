const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const { Sequelize } = require("sequelize");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/data/files", express.static(path.join(__dirname, "data/files")));

// Konfiguracja Sequelize z zewnetrzna baza danych
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

// Synchronizacja modelu z baza danych
sequelize
  .sync()
  .then(() => {
    console.log("Database synchronized");
  })
  .catch((error) => {
    console.error("Unable to synchronize the database:", error);
  });

const mainRoutes = require("./routes/main");

app.get("/", (req, res) => {
  res.render("index");
});
app.use(mainRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = { sequelize };
