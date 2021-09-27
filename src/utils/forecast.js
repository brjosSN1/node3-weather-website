const request = require('request');

const forecast =(lat, long, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=545869ac68ddffd702a644aaf545a5e2&query= " + lat + ", " + long + "&units=f"

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined);
        } else if (body.error) {
            callback('Unable to find location', undefined);
        } else {
            callback (undefined, body);
            }
        

    }) 
        
}


module.exports = forecast;