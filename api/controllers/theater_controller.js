const Theater = require("../models/theater_model");

// theaters: view all theaters
const viewAll = async (req, res) => {
    const allTheaters = await Theater.find();
    res.status(200).json({
        message: "All theater details",
        data: allTheaters,
    });
}


// theaters: get detais of a specific theater
const viewOne = (req, res) => {
    const id = req.params.id;
    const findTheater = Theater.findById(id);
    findTheater
        .then((result) => {
            res.status(200).json({
                message: "GET theater",
                data: result,
            });
        })
        .catch((err) => {
            res.status(500).json({
                error: err.message,
            });
        });
}

// theaters: add new theater
const addTheater = (req, res) => {
    const newTheater = new Theater({
        name: req.body.name,
        noOfSeats: req.body.noOfSeats,
        address: req.body.address,
        phone: req.body.phone,
    });

    newTheater
        .save()
        .then((result) => {
            res.status(201).json({
                message: "Created",
                newTheater: newTheater,
            });
        })
        .catch((err) => {
            res.status(500).json({
                error: err.message,
            });
        });
}

// theaters: update detais of a specific theater
const updateTheater = (req, res) => {
    const id = req.params.id;
    //update theater details
    Theater.findByIdAndUpdate(id, {
        name: req.body.name,
        noOfSeats: req.body.noOfSeats,
        address: req.body.address,
        phone: req.body.phone,
    })
        .then(async (result) => {
            const updatedTheater = await Theater.findById(id);
            res.status(200).json({
                message: "PUT request",
                updatedTheater: updatedTheater,
            });
        })
        .catch((err) => {
            res.status(500).json({
                error: err.message,
            });
        });
}
// theaters: delete theater
const deleteTheater = (req, res) => {
    const id = req.params.id;
    //delete theater
    const deletedTheater = Theater.findByIdAndDelete(id);
    deletedTheater
        .then((result) => {
            res.status(200).json({
                message: "Deleted",
                deletedTheater: result,
            });
        })
        .catch((err) => {
            res.status(500).json({
                err: err.message,
            });
        });
}


const all ={
    viewAll,
    viewOne,
    addTheater,
    updateTheater,
    deleteTheater
}

module.exports = all