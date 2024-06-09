const { Song } = require("../models/song");
const multer = require('multer');
const { Sequelize, DataTypes } = require("sequelize");
const { Op } = require("sequelize");

const storage = multer.memoryStorage();
const upload = multer({ storage });

exports.getHome = (req, res, next) => {
    res.render("home", {});
};

exports.getSongs = async (req, res) => {
    try {
        const result = await Song.findAll({
            attributes: ["id", "title", "author", "fileName", "category"],
        });
        const items = result.map((e) => e.get({ plain: true }));
        res.render("songs", { items });
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
};
exports.getPlayer = (req, res, next) => {
    res.render("player", { item: null });
};

exports.getPlayerWithSong = async (req, res, next) => {
    try {
        const itemId = req.params.id;
        const songId = parseInt(itemId, 10);
        console.log("Received song ID:", songId);

        const result = await Song.findByPk(songId);

        if (!result) {
            console.error("Song not found in database:", songId);
            return res.status(404).send('Song not found');
        }

        const item = result.get({ plain: true });
        console.log("Found song:", item);
        res.render("player", { item });

    } catch (error) {
        console.error("Error in getPlayerWithSong:", error);
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
            const songs = await Song.findAll({ where: query });
            const items = songs.map((song) => song.get({ plain: true }));
            res.render("search", { items, search, category });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
};

exports.getCategories = async (req, res) => {
    try {
        const result = await Song.findAll({
            attributes: [
                [Sequelize.fn("DISTINCT", Sequelize.col("category")), "category"],
            ],
        });
        const categories = result.map((e) => e.get({ plain: true }));
        res.render("categories", { categories });
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
};

exports.uploadSong = async (req, res) => {
    try {
        const { title, author, category } = req.body;
        const fileData = req.file.buffer;
        const fileName = req.file.originalname;

        // Log the input data for debugging
        console.log("Title:", title);
        console.log("Author:", author);
        console.log("Category:", category);
        console.log("File Data Size:", fileData.length);
        console.log("File Name:", fileName);

        await Song.create({
            title,
            author,
            category,
            file_data: fileData,
            fileName: fileName,
        });

        res.redirect("/songs");
    } catch (error) {
        console.error("Error uploading song:", error);
        res.status(500).json({ message: "Unable to create a record!" });
    }
};


exports.deleteSong = async (req, res) => {
    try {
        const { id } = req.params;
        await Song.destroy({ where: { id } });
        res.redirect("/songs");
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
};
