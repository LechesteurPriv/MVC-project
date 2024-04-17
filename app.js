const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const indexRouter = require("./routes/index");

app.use("/", indexRouter);

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
