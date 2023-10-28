import React from "react";
import "../styles/App.css";
import "../styles/bootstrap.min.css";
import NewBooking from "./BookingMain";


const App = () => {
  return (
    <div className="container">
      <NewBooking /> {/*  Displaying BookmyShow Page  */}
    </div>
  );
};

export default App;
