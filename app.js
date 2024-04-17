const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

const mainRoutes = require("./routes/main");

app.get("/", (req, res) => {
  res.render("index");
});
app.use(mainRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
