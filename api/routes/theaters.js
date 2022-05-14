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

// theaters: add new theater
router.post('/', (req, res) => {
    console.log('req', req.body);
    const newTheater = new Theater({
        name: req.body.name,
        noOfSeats: req.body.noOfSeats,
        address: req.body.address,
        phone: req.body.phone
    });
    console.log('n', newTheater.name);

    newTheater.save()
        .then((result) => {
            console.log('result: ', result);
            res.status(201).json({
                message: 'POST request', 
                newTheater: newTheater
            })
        }).catch((err) => {
            console.log(err.message);
            res.status(500).json({
                error: err.message
            })
    })
})

// theaters: update detais of a specific theater
// theaters: delete theater
module.exports = router;