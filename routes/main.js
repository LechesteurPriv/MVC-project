const express = require("express");
const mainController = require("../controllers/main");
const router = express.Router();
const storageUpload = require("../config/storage");

router.get("/home", mainController.getHome);
router.get("/songs", mainController.getSongs);
router.get("/player/:id", mainController.getPlayerWithSong);
router.get("/player", mainController.getPlayer);
router.get("/search", mainController.getSearch);
router.get("/categories", mainController.getCategories);
router.post("/upload", storageUpload.single("song"), mainController.uploadSong);
router.post("/delete/:id", mainController.deleteSong);

module.exports = router;
