const { connection } = require("../connector");

// This test case checks the last booking details.
describe("Last Booking", () => {
  it("last booking details check", async () => {
    await connection
      .findOne({})
      .sort({ $natural: -1 })
      .then((lastMovie) => {
        if (lastMovie) {
          // Checking last movie
          // console.log(lastMovie);
        } else {
          // If there is no movies it will log a message
          console.log("no previous booking found.");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  });
});
