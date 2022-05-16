const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const multer = require('multer')
const morgan = require('morgan');
const path = require("path");
const fs = require("fs");
const cors = require('cors')
dotenv.config();
const movieRoutes = require('./api/routes/movie_routes');
const theaterRoutes = require('./api/routes/theater_routes');



const PORT = process.env.PORT;
const server = express();
server.use(express.json());
server.use(express.urlencoded({extended: false}));
server.use(cors())

//storage config
const storage = multer.diskStorage({
    destination: path.join(__dirname, './uploads'),
    filename: (req, file, cb) => {
        console.log(file)
        cb(null, new Date().getTime() + path.extname(file.originalname));
    }
});

//logger config
server.use(morgan('common', {
    stream: fs.createWriteStream('./access.log', {flags: 'a'})
}));


server.use(multer({storage}).single('image'));
server.use('/api/movies', movieRoutes);
server.use('/api/theaters', theaterRoutes);

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