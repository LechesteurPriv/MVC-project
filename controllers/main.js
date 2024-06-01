const { Op } = require("sequelize");
const { sequelize } = require("../app");
// const Song = require("../models/song")(
//   require("../app").sequelize,
//   require("sequelize")
// );
const songs = require("../data/songs");

exports.getHome = (req, res, next) => {
  res.render("home", {});
};

// exports.getSongs = async (req, res) => {
//     try {
//         const songs = await Song.findAll();
//         res.render("songs", { songs });
//     } catch (error) {
//         res.status(500).send(error.message);
//     }
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

exports.getSearch = async (req, res) => {
  try {
    const { search, category } = req.query;
    const query = {};

    if (search) {
      query.title = { [Op.like]: `%${search}%` };
    }

    if (category) {
      query.category = category;
    }

    const songs = await Song.findAll({ where: query });
    res.render("search", { songs, search, category });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.getCategories = async (req, res) => {
  try {
    const categories = await Song.findAll({
      attributes: [
        [sequelize.fn("DISTINCT", sequelize.col("category")), "category"],
      ],
    });
    res.render("categories", { categories });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.uploadSong = async (req, res) => {
  try {
    const { originalname } = req.file;
    const { category } = req.body;
    await Song.create({
      title: originalname,
      filename: originalname,
      category,
    });
    res.redirect("/songs");
  } catch (error) {
    res.status(500).send(error.message);
  }
};
