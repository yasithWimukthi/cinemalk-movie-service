const express = require('express');
const Movies = require('../controllers/movie_controller');
const validator = require('../validation/movie_validation');
const schema = require('../validation/movie_schema');
const router = express.Router();

router.get("/movies",validator(schema), Movies.getMovies);
router.post("/movies",validator(schema), Movies.createMovie);
router.put("/movies/:id",validator(schema), Movies.updateMovie);
router.delete("/movies/:id", Movies.deleteMovie);

module.exports = router;
