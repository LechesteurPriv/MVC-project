const { Op } = require("sequelize");
const { Song } = require("../models/song");

exports.getHome = (req, res, next) => {
  res.render("home", {});
};

exports.getSongs = async (req, res) => {
  try {
    await Song.findAll({
      attributes: ["id", "title", "author", "fileName", "category"],
    })
      .then((result) => {
        const items = result.map((e) => e.get({ plain: true }));
        res.render("songs", { items });
      })
      .catch((err) => console.error(err));
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.getPlayer = (req, res, next) => {
  res.render("player", { item: null });
};

exports.getPlayerWithSong = async (req, res, next) => {
  try {
    const itemId = req.params.id;
    await Song.findByPk(+itemId.substring(1))
      .then((result) => {
        const item = result.get({ plain: true });
        res.render("player", { item });
      })
      .catch((err) => console.error(err));
  } catch (error) {
    res.status(500).send(error.message);
  }
  // const item = songs.find((e) => +e.id === +itemId.substring(1));
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
    const { title, author, category } = req.body;
    const { filename } = req.file;
    await Song.create({
      title,
      author,
      category,
      fileName: filename,
    })
      .then(() => {
        res.redirect("/songs");
      })
      .catch((err) => {
        console.log(err);
        return res.json({
          message: "Unable to create a record!",
        });
      });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
