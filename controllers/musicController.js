const songs = require('../models/song');

exports.getSongs = (req, res) => {
    res.render('index', { songs: songs });
};
