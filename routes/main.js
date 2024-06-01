const express = require("express");
const mainController = require("../controllers/main");
const router = express.Router();
const multer = require("multer");

// Konfiguracja Multer dla przesylania plikow
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage: storage });

router.get("/home", mainController.getHome);
router.get("/songs", mainController.getSongs);
router.get("/player", mainController.getPlayer);
router.get("/search", mainController.getSearch);
router.get("/categories", mainController.getCategories);
router.post("/upload", upload.single('song'), mainController.uploadSong);

module.exports = router;
