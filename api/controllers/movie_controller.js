const cloudinary = require('cloudinary').v2;
const Movie = require('../models/movie');


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


const createMovie = async (req, res) => {

    try {
        const result = await cloudinary.uploader.upload(req.file.path);
        const mv = new Movie({
            name: req.body.name,
            cast: req.body.cast,
            description: req.body.description,
            imageURL: result.url,
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


const updateMovie = async (req, res) => {

    try {
        Movie.findById(req.params.id, (error, movie) => {
            if (error) {
                res.status(500).send({message: "Could not find the movie"});
            }

            movie.name = req.body.name
            movie.cast = req.body.cast
            movie.description = req.body.description

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
    deleteMovie
}


module.exports = modulesList