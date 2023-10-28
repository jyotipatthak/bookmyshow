import React, { useEffect, useState } from "react";
import "../styles/App.css";
import "../styles/bootstrap.min.css";
import { movies, slots, seats } from "./data"; // Importing data from a separate file
import axios from "axios"; // Importing Axios for making API requests
import LastBooking from "./LastBooking"; // Importing a component for displaying the last booking details

const NewBooking = () => {
  const [lastBooking, setlastBooking] = useState({}); // State for storing the last booking details
  const [display, setDisplay] = useState(false); // State for controlling the visibility of last booking details
  const [movie, setMovie] = useState(""); // State for the selected movie
  const [slot, setSlot] = useState(""); // State for the selected time slot
  const [seat, setSeat] = useState({
    A1: "0",
    A2: "0",
    A3: "0",
    A4: "0",
    D1: "0",
    D2: "0",
  }); // State for the selected seats

  let movieTicket = {
    movie: movie,
    slot: slot,
    seats: {
      A1: seat.A1,
      A2: seat.A2,
      A3: seat.A3,
      A4: seat.A4,
      D1: seat.D1,
      D2: seat.D2,
    },
  };

  // Handler function for updating the selected seats
  const handleSeats = (e) => {
    const { name, value } = e.target;
    setSeat({ ...seat, [name]: value });
  };

  // Handler function for submitting a movie booking
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (movie) {
      if (slot) {
        if (
          seat.A1 !== "0" ||
          seat.A2 !== "0" ||
          seat.A3 !== "0" ||
          seat.A4 !== "0" ||
          seat.D1 !== "0" ||
          seat.D2 !== "0"
        ) {
          // Sending a POST request to save the booking
          await axios
            .post("https://bookmyshow-8li1.onrender.com/api/booking", movieTicket)
            .then(() => {
              alert("Ticket booked successfully");
              setlastBooking(movieTicket); // Updating the last booking state
              setDisplay(true); // Displaying the last booking details
            })
            .catch((error) => {
              console.error("Error sending data:", error);
            });

          // Clearing all selections after successful booking
          localStorage.removeItem("movie");
          localStorage.removeItem("slot");
          localStorage.removeItem("seats");
          setMovie("");
          setSlot("");
          setSeat({
            A1: "0",
            A2: "0",
            A3: "0",
            A4: "0",
            D1: "0",
            D2: "0",
          });
        } else {
          alert("Please Select Seats");
          return;
        }
      } else {
        alert("Please Select Time Slot");
        return;
      }
    } else {
      alert("Please Select Movie");
      return;
    }
  };

  // useEffect for fetching the last booking details and handling local storage
  useEffect(() => {
    const localMovie = localStorage.getItem("movie");
    if (localMovie) {
      setMovie(localMovie);
    }
    const localSlot = localStorage.getItem("slot");
    if (localSlot) {
      setSlot(localSlot);
    }
    const localSeats = JSON.parse(localStorage.getItem("seats"));
    if (localSeats) {
      setSeat(localSeats);
    }

    // Fetching the last booking details using a GET request
    axios
      .get("https://bookmyshow-8li1.onrender.com/api/booking")
      .then((response) => {
        let fetchData = response.data[0] || response.data;
        if (fetchData.length === 0) {
          console.log("NO PREVIOUS BOOKING", fetchData);
          setDisplay(false);
        } else {
          setlastBooking(fetchData); // Updating the last booking state
          setDisplay(true);
        }
      })
      .catch((err) => {
        console.error("No Previous Booking Available ", err);
      });
  }, []);

  return (
    <>
      {/* This Section is for Selecting the Movie-Booking */}
      <div className="selectColumn">
        {/* Column for selecting the movie, time slot, and seats */}
        <h4 className="fs-3 mb-3">
          book<span className="my">my</span>show
        </h4>
        <form onSubmit={handleSubmit}>
          <div>
            {/* Movie Selection */}
            <div className="movie-row">
              <h5>Select a movie</h5>
              {/* Generating options for selecting a movie */}
              {movies.map((smovie, index) => (
                <div
                  key={index}
                  className={`movie-column ${
                    movie === smovie ? "movie-column-selected" : ""
                  }`}
                  onClick={() => {
                    setMovie(smovie);
                    localStorage.setItem("movie", smovie);
                  }}
                >
                  <h6>{smovie}</h6>
                </div>
              ))}
            </div>
            {/* Time Slot Selection */}
            <div className="slot-row">
              <h5>Select a Time Slot</h5>
              {/* Generating options for selecting a time slot */}
              {slots.map((eslot, index) => (
                <div
                  key={index}
                  className={`slot-column ${
                    slot === eslot ? "slot-column-selected" : ""
                  }`}
                  onClick={() => {
                    setSlot(eslot);
                    localStorage.setItem("slot", eslot);
                  }}
                >
                  <h6>{eslot}</h6>
                </div>
              ))}
            </div>
            {/* Seat Selection */}
            <div className="seat-row">
              <h5>Select the Seats</h5>
              {/* Generating options for selecting seats */}
              {seats.map((eseat, index) => (
                <div
                  key={index}
                  className={`seat-column ${
                    movieTicket.seats[eseat] > 0 &&
                    movieTicket.seats[eseat] === seat[eseat]
                      ? "seat-column-selected"
                      : ""
                  }`}
                >
                  <label htmlFor={`seat-${eseat}`}>
                    <h6> Type {eseat}</h6>
                  </label>
                  <input
                    className="d-flex text-center"
                    id={`seat-${eseat}`}
                    type="number"
                    max={20}
                    min={0}
                    name={eseat}
                    onChange={handleSeats}
                    onClick={() => {
                      localStorage.setItem("seats", JSON.stringify(seat));
                    }}
                    value={seat[eseat]}
                  ></input>
                </div>
              ))}
            </div>
          </div>
          <div className="book-button">
            <button>Book Now</button>
          </div>
        </form>
      </div>
      {/* This Section is for Displaying The Last booking Details */}
      <div className="bookingColumn">
        <LastBooking display={display} lastBooking={lastBooking} />
      </div>
    </>
  );
};

export default NewBooking;
