const express = require('express');
const router = express.Router();
const Theater = require('../models/theater');

// theaters: view all theaters
router.get('/', async (req, res) => {
    const allTheaters = await Theater.find();
    res.status(200).json({
        message: 'GET request',
        data: allTheaters
    });
})

// theaters: get detais of a specific theater
router.get('/:ID', (req, res) => {
    const id = req.params.ID;
    const findTheater = Theater.findById(id);
    findTheater
        .then((result) => {
            res.status(200).json({
                message: 'GET theater',
                data: result
            })            
        })
        .catch((err) => {
            res.status(401).json({
            error: err.message
        })
    })
})

module.exports = router;