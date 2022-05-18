const mongoose = require('mongoose');

/**
 * movie-name = title
 * movie-img-src = poster
 */
const movieSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    release_date: {
        type: Number,
        required: true
    },
    overview: {
        type: String,
        required: true
    },
    poster: {
        type: String,
        required:true
    },
    genres: {
        type: Array,
        required: true
    },
    public_id:{
        type: String,
        required:true
    }
});

module.exports = mongoose.model('Movie', movieSchema,'movies');