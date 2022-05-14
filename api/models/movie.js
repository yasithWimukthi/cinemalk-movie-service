const mongoose = require('mongoose');

const movieSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    cast: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageURL: {
        type: String,
        required:true
    },
    public_id:{
        type: String,
        required:true
    }
});

module.exports = mongoose.model('Movie', movieSchema);