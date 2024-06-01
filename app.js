const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");
const app = express();

const db = require("./config/database");
const SongModel = require("./models/song");

app.set("view engine", "ejs");
app.set("views", "views");

const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const mainRoutes = require("./routes/main");

app.get("/", (req, res) => {
  res.render("index");
});
app.use(mainRoutes);

const initApp = async () => {
  try {
    await db.authenticate();
    console.log("Database authenticated and synchronized successfully.");

    SongModel.Song.sync({ alter: true });

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () =>
      console.log(`Server running at http://localhost:${PORT}/`)
    );
  } catch (error) {
    console.error("Unable to synchronize the database:", error);
  }
};

initApp();
