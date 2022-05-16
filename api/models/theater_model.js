const mongoose = require('mongoose');

const theaterSchema = mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    noOfSeats: {
        type: Number, 
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: String
    }
});

module.exports = mongoose.model('Theater', theaterSchema);