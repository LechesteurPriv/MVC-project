const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");
const app = express();
const mainRoutes = require("./routes/main");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const db = require("./config/database");

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// Use main routes
app.use(mainRoutes);

const initApp = async () => {
  try {
    await db.authenticate();
    console.log("Database authenticated and synchronized successfully.");

    const { Song } = require("./models/song");
    await Song.sync({ alter: true });

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}/`));
  } catch (error) {
    console.error("Unable to synchronize the database:", error);
  }
};

initApp();
