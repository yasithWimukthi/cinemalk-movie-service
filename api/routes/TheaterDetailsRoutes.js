const express = require("express");
const router = express.Router();
const TheaterDetails = require("../controllers/TheaterDetailsController");

router.get('/', TheaterDetails.getAll);
router.post('/addTheater',TheaterDetails.addMovieToTheater)

module.exports = router;
