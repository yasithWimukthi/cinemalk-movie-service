const TheaterDetails = require('../models/TheaterDetails');

const addMovieToTheater = async () => {
  try {
    const theaterDetails = await TheaterDetails.findOne({
        movieName: req.body.movieName,
    });
    if (theaterDetails) {
      theaterDetails.theater.push(...req.body.theater);
      await theaterDetails.save();
      return res.status(200).json({
        success: true,
        message: 'Movie added to theater',
      });
    }
    else {
      const theaterDetails = new TheaterDetails({
        movieName: req.body.movieName,
        theater: [...req.body.theater],
        imageURL: req.body.imageURL,
      });
      await theaterDetails.save();
      return res.status(200).json({
        success: true,
        message: 'Movie added to theater',
      });
    }

  } catch (error) {
    console.log(error);
  }
}

const modulesList = {
  addMovieToTheater,
}

module.exports = modulesList;