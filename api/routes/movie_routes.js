const express = require('express');
const Movie_routes = require('../controllers/movie_controller');
const validator = require('../validations/validation');
const schema = require('../validations/movie_schema');
const router = express.Router();

// get all movies
router.get("/", Movie_routes.getMovies);
//add a new movie
router.post("/",validator(schema), Movie_routes.createMovie);
//update a movie by id
router.put("/:id",validator(schema), Movie_routes.updateMovie);
//delete movie by id
router.delete("/:id", Movie_routes.deleteMovie);

module.exports = router;
