const express = require("express");
const routes = express.Router();
const { connection } = require("../connector");
const mongoose = require("mongoose");
///      This API is for Booking Movie      ///

routes.post("/booking", async (req, res) => {
  try {
    if (!req.body.movie) {
      res.status(400).json({ ERROR: "Movies Name Required" });
    }
    if (!req.body.slot) {
      res.status(400).json({ ERROR: "Slot Required" });
    }
    if (
      req.body.seats.A1 === 0 &&
      req.body.seats.A2 === 0 &&
      req.body.seats.A3 === 0 &&
      req.body.seats.A4 === 0 &&
      req.body.seats.D1 === 0 &&
      req.body.seats.D2 === 0
    ) {
      res.status(400).json({ ERROR: "Seat Required" });
    } else {
      // Creating a new Movie-booking with the use of given Schema.

      const newBooking = new connection({
        movie: req.body.movie,
        slot: req.body.slot,
        seats: {
          A1: req.body.seats.A1,
          A2: req.body.seats.A2,
          A3: req.body.seats.A3,
          A4: req.body.seats.A4,
          D1: req.body.seats.D1,
          D2: req.body.seats.D2,
        },
      });
      newBooking
        .save()
        .then(() => {
          //Saving into database
          res.status(200).json({
            booking: "Booking Successfull",
            bookingDetails: newBooking,
          });
        })
        .catch((err) => {
          //If error in Saving to the Database
          res.status(422).json({
            booking: "Sorry Booking Not Completed / Internal Error",
            error: err,
          });
        });
    }
  } catch (error) {
    res.status(500).json(error); // This will show Any Error if it occurs.
  }
});

module.exports = routes;
