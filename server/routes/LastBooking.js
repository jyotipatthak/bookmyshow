const express = require("express");
const routes = express.Router();
const { connection } = require("../connector");

// This API is for getting the Last Booking details
routes.get("https://bookmyshow-8li1.onrender.com/Api/booking", async (req, res) => {
  try {
    // Finding all saved movies in our database and selecting only the last one.
    await connection
      .findOne({})
      .sort({ $natural: -1 })
      .then((lastMovie) => {
        if (lastMovie) {
          // If the last movie is present, it will show all details.
          res.status(200).json({
            movie: lastMovie.movie,
            seats: lastMovie.seats,
            slot: lastMovie.slot,
          });
        } else {
          // If there are no movies, it will send a message.
          res.status(404).json({ message: "No previous booking found." });
        }
      });
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = routes;
