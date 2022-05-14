const express = require("express");
const router = express.Router();
const Theater = require("../models/theater");
// const bodyParser = require('body-parser');

// express().use(bodyParser.urlencoded({ extended: true }));
// express().use(bodyParser.json());

// theaters: view all theaters
router.get("/", async (req, res) => {
  const allTheaters = await Theater.find();
  res.status(200).json({
    message: "GET request",
    data: allTheaters,
  });
});

// theaters: get detais of a specific theater
router.get("/:ID", (req, res) => {
  const id = req.params.ID;
  const findTheater = Theater.findById(id);
  findTheater
    .then((result) => {
      res.status(200).json({
        message: "GET theater",
        data: result,
      });
    })
    .catch((err) => {
      res.status(401).json({
        error: err.message,
      });
    });
});

// theaters: add new theater
router.post("/", (req, res) => {
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
        message: "POST request",
        newTheater: newTheater,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err.message,
      });
    });
});

// theaters: update detais of a specific theater
router.put("/:theaterID", (req, res) => {
  const id = req.params.theaterID;
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
});

module.exports = router;
