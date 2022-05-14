const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const theaterRoutes = require('./api/routes/theaters');
const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT || 3000;

const server = express();

server.use(cors());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

server.use('/theaters', theaterRoutes);

const DB_CONNECTION_URL = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.gtmij.mongodb.net/movie-theater`;

mongoose.connect(DB_CONNECTION_URL)
    .then((result) => {
        console.log('connected to DB');
        server.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    }).catch((error) => {
    console.log(error);
})