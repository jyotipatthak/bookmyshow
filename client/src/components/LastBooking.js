import React from "react";

// This Function is for displaying the Last Booking Details on the BookmyShow Page.
function LastBooking(props) {
  const { display, lastBooking } = props;
  return (
    <div className="last-order">
      <h5>Last Booking Details</h5>

      {display == false ? (
        <p>No Previous Booking Found</p> // <-- If no booking found it will show this
      ) : (
        //  Displaying the last-Movie-Booking Details
        <div>
          <h6>Seats:</h6>
          <h6>A1: {lastBooking.seats.A1}</h6>
          <h6>A2: {lastBooking.seats.A2}</h6>
          <h6>A3: {lastBooking.seats.A3}</h6>
          <h6>A4: {lastBooking.seats.A4}</h6>
          <h6>D1: {lastBooking.seats.D1}</h6>
          <h6>D2: {lastBooking.seats.D2}</h6>
          <h6>Slot: {lastBooking.slot}</h6>
          <h6>Movie: {lastBooking.movie}</h6>
        </div>
      )}
    </div>
  );
}

export default LastBooking;
