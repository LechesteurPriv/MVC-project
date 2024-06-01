const { Op } = require('sequelize');
const Song = require('../models/song')(require('../app').sequelize, require('sequelize'));

exports.getAllSongs = async (req, res) => {
    try {
        const { search, category } = req.query;
        const query = {};

        if (search) {
            query.title = { [Op.like]: `%{search}%` };
        }

        if (category) {
            query.category = category;
        }

        const songs = await Song.findAll({ where: query });
        res.render('index', { songs, search, category });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.uploadSong = async (req, res) => {
    try {
        const { originalname } = req.file;
        const { category } = req.body;
        await Song.create({ title: originalname, filename: originalname, category });
        res.redirect('/');
    } catch (error) {
        res.status(500).send(error.message);
    }
};
