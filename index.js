// index.js
const { nextISSTimesForMyLocation } = require('./iss');
nextISSTimesForMyLocation((error, data) => {
  for (let even of data) {
    const atTime = new Date(even.risetime);
    const dur = even.duration;
    console.log(`Next pass at ${atTime} for ${dur} seconds!`);
  }
});