const cloudinary = require('cloudinary').v2;
const Movie = require('../models/movie_model');
const Theater = require("../models/theater_model");

//cloud config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

//add a new movie
const createMovie = async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path);
        const mv = new Movie({
            title: req.body.title,
            release_date: req.body.release_date,
            overview: req.body.overview,
            genres: req.body.genres,
            poster: result.url,
            public_id: result.public_id
        });

        mv.save()
            .then(() => {
                res.status(201).json({message: "Movie Uploaded"})
            }).catch((err) => {
            res.status(500).json({
                error: err.message
            })
        })

    } catch (e) {
        res.status(500).json(e)
    }
}

// get all movies
const getMovies = async (req, res) => {

    try {
        Movie.find((err, movies) => {
            if (err) {
                res.status(500).send({message: "Could not find movies"});
            } else {
                res.send(movies);
            }
        });

    } catch (e) {
        res.status(500).json(e)
    }
}


//get one movie
const viewOneMovie = (req, res) => {
    const id = req.params.id;
    const findMovie = Movie.findById(id);
    findMovie
        .then((result) => {
            res.status(200).json({
                message: "found movie",
                data: result,
            });
        })
        .catch((err) => {
            res.status(500).json({
                error: err.message,
            });
        });
}







//update a movie by id
const updateMovie = async (req, res) => {

    try {
        Movie.findById(req.params.id, (error, movie) => {
            if (error) {
                res.status(500).send({message: "Could not find the movie"});
            }

            movie.title = req.body.title
            movie.genres = req.body.genres
            movie.overview = req.body.overview

            movie.save((err) => {
                if (err) {
                    res.status(500).send({message: "Could not update movie"});
                } else {
                    res.status(200).send({message: "movie updated"});
                }
            });
        });

    } catch (e) {
        res.status(500).json(e)
    }
}

//delete movie by id
const deleteMovie = async (req, res) => {

    try {
        Movie.findById(req.params.id, (error, movie) => {
            if (error) {
                res.status(500).send({message: "Could not find the movie"});
            }


            try {

                cloudinary.uploader.destroy(movie.public_id, (result) => {
                    console.log(result)
                });
                Movie.remove({_id: req.params.id}, (err) => {
                    if (err) {
                        res.status(500).send({message: "Could not delete movie "});
                    } else {
                        res.status(200).send({message: "movie deleted successfully"})
                    }
                });


            } catch (e) {

                res.status(500).json(e)
            }


        });

    } catch (e) {
        res.status(500).json(e)
    }
}


const modulesList = {
    createMovie,
    getMovies,
    updateMovie,
    deleteMovie,
    viewOneMovie
}


module.exports = modulesList