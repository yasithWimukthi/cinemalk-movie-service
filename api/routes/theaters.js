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

module.exports = router;