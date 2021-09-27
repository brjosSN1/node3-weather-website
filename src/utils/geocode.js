const request = require('request');


const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + address + ".json?limit=1&access_token=pk.eyJ1IjoiYnJpam9zbWFwcyIsImEiOiJja3QzM3d6cHowZXV4MnBwZzVrdXpmeXQwIn0.CaLyW2js_PE2CdesK5E4rQ";

    request({
        url,
        json: true
    }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (typeof (body.features[0]) == 'undefined') {
            callback('Unable to find location. Try another search.', undefined)
        } else {           
                callback(undefined, {
                    lattitude: body.features[0].center[0],
                    longitude: body.features[0].center[1],
                    location: body.features[0].place_name
                });
           
        }


    });
}

module.exports = geocode;