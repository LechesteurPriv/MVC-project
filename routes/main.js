const express = require("express");
const mainController = require("../controllers/main");
const router = express.Router();

router.get("/home", mainController.getHome);
router.get("/songs", mainController.getSongs);
router.get("/player", mainController.getPlayer);
router.get("/search", mainController.getSearch);
router.get("/categories", mainController.getCategories);

module.exports = router;
