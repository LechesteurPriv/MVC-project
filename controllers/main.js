const { Op } = require("sequelize");
const { Song } = require("../models/song");
const { Sequelize } = require("sequelize");

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
};

exports.getSearch = async (req, res) => {
  try {
    const { search, category } = req.query;
    const query = {};

    if (search) {
      query[Op.or] = [
        { title: { [Op.like]: `%${search}%` } },
        { author: { [Op.like]: `%${search}%` } },
      ];
    }

    if (category) {
      query.category = { [Op.like]: `%${category}%` };
    }

    if (!search && !category) {
      res.render("search", { items: null, search, category });
    } else {
      await Song.findAll({ where: query })
        .then((songs) => {
          const items = songs.map((song) => song.get({ plain: true }));
          res.render("search", { items, search, category });
        })
        .catch((err) => console.error(err));
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.getCategories = async (req, res) => {
  try {
    await Song.findAll({
      attributes: [
        [Sequelize.fn("DISTINCT", Sequelize.col("category")), "category"],
      ],
    })
      .then((result) => {
        const categories = result.map((e) => e.get({ plain: true }));
        res.render("categories", { categories });
      })
      .catch((err) => console.error(err));
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

exports.deleteSong = async (req, res) => {
    try {
        const { id } = req.params;
        await Song.destroy({ where: { id } })
            .then(() => {
                res.redirect("/songs");
            })
            .catch((err) => console.error(err));
    } catch (error) {
        res.status(500).send(error.message);
    }
};