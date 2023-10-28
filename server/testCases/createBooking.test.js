const { connection } = require("../connector");
const assert = require("assert");

// This test case checks the creation of booking
describe("Create Booking", () => {
  it("movie creation check", () => {
    // assert(true);
    const ticket = new connection({
      movie: "test_Movie_Booking",
      slot: "10.00 AM",
      seats: {
        A1: 2,
        A2: 5,
        A3: 0,
        A4: 0,
        D1: 0,
        D2: 4,
      },
    });
    // Save the object in database
    ticket
      .save()
      .then(() => {
        // The ticket.isNew returns false if object is stored in database
        // The !ticket.isNew becomes true and the test passes.
        assert(!ticket.isNew);
      })
      .catch(() => {
        console.log("error");
      });
  });
});
