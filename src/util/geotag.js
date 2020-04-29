const axios = require("axios");

geoTag = (address, callback) => {
  const url = encodeURI(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiYWRpbHphbWFsIiwiYSI6ImNrOWZoM2xqODBiaGIzaHMwM3Y0OHlmcHEifQ.iOYhdHIjjuqSQn8fMUvSAw&limit=1`
  );
  axios
    .get(url)
    .then((response) => {
      //     const data={
      //         lat:response.data.features[0].center[1],
      //         lng: response.data.features[0].center[0],
      //         location: response.data.features[0].place_name,
      // }
      data = {
        lat: response.data.features[0].center[1],
        lng: response.data.features[0].center[0],
        location: response.data.features[0].place_name,
      };
      callback(undefined, data);
    })
    .catch((error) => {
      if (address) callback("Address error");
      else callback("Network Error");
    });
};

module.exports = geoTag;
