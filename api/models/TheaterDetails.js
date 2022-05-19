const mongoose = require('mongoose');

const theaterDetailsSchema = mongoose.Schema({
    movieName: {
        type: String,
        required: true
    },
    imageURL: {
        type: String,
        required:true
    },
    overview:{
        type: String,
        required: true
    },
    theater: [
        {
            name: {
                type: String,
                required: true
            },
            price: {
                type: String
            },
            time:{
                type: String
            },
            seatCount: {
                type: String
            }

        }
    ],

});

module.exports = mongoose.model('TheaterDetails', theaterDetailsSchema);