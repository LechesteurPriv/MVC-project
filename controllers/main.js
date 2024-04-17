exports.getHome = (req, res, next) => {
  res.render("home", {});
};

exports.getSongs = (req, res, next) => {
  res.render("songs", {});
};

exports.getPlayer = (req, res, next) => {
  res.render("player", {});
};

exports.getSearch = (req, res, next) => {
  res.render("search", {});
};

exports.getCategories = (req, res, next) => {
  res.render("categories", {});
};
