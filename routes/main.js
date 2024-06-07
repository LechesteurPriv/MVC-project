const express = require("express");
const mainController = require("../controllers/main");
const router = express.Router();
const storageUpload = require("../config/storage");
const songController = require('../controllers/songController');


router.get("/home", mainController.getHome);
router.get("/songs", mainController.getSongs);
router.get("/player/:id", mainController.getPlayerWithSong);
router.get("/player", mainController.getPlayer);
router.get("/search", mainController.getSearch);
router.get("/categories", mainController.getCategories);
router.post("/upload", storageUpload.single("song"), mainController.uploadSong);
router.post("/delete/:id", mainController.deleteSong);
router.get('/categories/:category', songController.getSongsByCategory);

module.exports = router;
