const request = require('request');

const fetchMyIP = function(callback) {
  request('https://api.ipify.org?format=json', (err, req, body) => {
    let ip = JSON.parse(body).ip
    callback(err, ip)
  })
}  

module.exports = fetchMyIP;