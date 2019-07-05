const request = require('request');

const fetchMyIP = function(callback) {
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    let ip = JSON.parse(body).ip;
    callback(error, ip);
  });
};


const fetchCoordsByIP = function(ip, callback) {
  request(`https://ipvigilante.com/${ip}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode === 200) {
      let bodyObj = JSON.parse(body);
      const location = {
        latitude: bodyObj.data.latitude,
        longitude:  bodyObj.data.longitude
      };
      callback(error,location);
      return;
    } else {
      const msg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
      callback(msg, null);
    }
  }
  );
};

const fetchISSFLYOverTimes = function(loc,callback) {
  request(`http://api.open-notify.org/iss-pass.json?lat=${loc.latitude}&lon=${loc.longitude}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode === 200) {
      const returnedData = JSON.parse(body);
      const resp = returnedData.response;
      callback(error, resp);
      return;
    } else {
      const msg = `Status Code ${response.statusCode} when fetching location. Response: ${body}`;
      callback(msg, null);
    }
  });
};

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    fetchCoordsByIP(ip, (error, data) => {
      fetchISSFLYOverTimes(data, callback);
    });
  });
};


module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFLYOverTimes, nextISSTimesForMyLocation};