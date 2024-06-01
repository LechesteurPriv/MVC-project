const songs = require("../data/songs");

exports.getHome = (req, res, next) => {
  res.render("home", {});
};

exports.getSongs = (req, res, next) => {
  res.render("songs", { items: songs });
};

exports.getPlayer = (req, res, next) => {
  res.render("player", { item: null });
};

exports.getPlayerWithSong = (req, res, next) => {
  const itemId = req.params.id;
  const item = songs.find((e) => +e.id === +itemId.substring(1));
  res.render("player", { item });
};

exports.getSearch = (req, res, next) => {
  res.render("search", {});
};

exports.getCategories = (req, res, next) => {
  res.render("categories", {});
};
