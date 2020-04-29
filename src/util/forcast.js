const axios = require('axios');

const forCasts = (lat, lng,callback) => {
  const url = `http://api.weatherstack.com/current?access_key=f402cd23ea54ca082f073b3d04a70155&query=${lat},${lng}&units=m`;
  console.log(url)
    axios
      .get(url)
        .then((response) => {
        const data = response.data;
          callback(
            undefined,
            `Current temprature in ${data.location.name}, ${data.location.country} is ${data.current.temperature} degree and humidity is ${data.current.humidity} +${data.current.weather_descriptions}`
          );
      })
        .catch((error) => {
            callback('Address not found');
      });
}

module.exports =forCasts
// module.exports={forCasts}