const { Op } = require("sequelize");
const { Song } = require("../models/song");
const { Sequelize } = require("sequelize");


exports.getSongsByCategory = async (req, res) => {
    try {
        const category = req.params.category;
        await Song.findAll({
            where: {
                category: {
                    [Op.like]: category,
                },
            },
            attributes: ["id", "title", "author", "fileName", "category"],
        })
            .then((result) => {
                const items = result.map((e) => e.get({ plain: true }));
                res.render("songsByCategory", { items, category });
            })
            .catch((err) => console.error(err));
    } catch (error) {
        res.status(500).send(error.message);
    }
};
