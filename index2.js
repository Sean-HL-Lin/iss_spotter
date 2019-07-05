// index2.js

const { nextISSTimesForMyLocation } = require('./iss_promised');

// index2.js



nextISSTimesForMyLocation()
  .then((data) => {
    for (let even of data) {
      const atTime = new Date(even.risetime);
      const dur = even.duration;
      console.log(`Next pass at ${atTime} for ${dur} seconds!`);
    }
  })
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });