const request = require('request-promise-native');

const fetchMyIP = request('https://api.ipify.org?format=json');


const fetchCoordsByIP = function(body) {
  const ipObj = JSON.parse(body);
  const ip = ipObj.ip;
  return request(`https://ipvigilante.com/${ip}`);
};
module.exports = { fetchMyIP, fetchCoordsByIP };



const fetchISSFlyOverTimes = function(body) {
  const outterObjectOfLocation = JSON.parse(body);
  const location = outterObjectOfLocation.data;
  const url = `http://api.open-notify.org/iss-pass.json?lat=${location.latitude}&lon=${location.longitude}`;
  return request(url);
};

const nextISSTimesForMyLocation = function() {
  return fetchMyIP
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const { response } = JSON.parse(data);
      return response;
    });
};

module.exports = { nextISSTimesForMyLocation };
