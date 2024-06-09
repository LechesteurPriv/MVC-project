const express = require("express");
const multer = require('multer');
const mainController = require("../controllers/main");
const songController = require('../controllers/songController');
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get("/", (req, res) => {
    res.render("index");
});

router.get("/home", mainController.getHome);
router.get('/songs', mainController.getSongs);
router.get("/player/:id", mainController.getPlayerWithSong);
router.get("/player", mainController.getPlayer);
router.get("/search", mainController.getSearch);
router.get("/categories", mainController.getCategories);
router.post('/upload', upload.single('file'), mainController.uploadSong);
router.post('/delete/:id', mainController.deleteSong);
router.get('/categories/:category', songController.getSongsByCategory);

module.exports = router;
