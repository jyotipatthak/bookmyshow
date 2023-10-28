const { connection } = require("../connector");

// This test case removes the last test-booking details.
describe("Removing Booking", () => {
  it("test booking remove check", async () => {
    // Deleting the test-booking created from the database so it wont affect our actual/real database.
    await connection
      .deleteOne({
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
      })
      .catch((error) => {
        console.log(error);
      });
  });
});
