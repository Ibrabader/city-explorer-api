'use strict';

const express = require('express');
const app = express();
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();
app.use(cors());

const PORT = process.env.PORT;
class Forcast {
    constructor(datetime, description) {
        this.datetime = datetime;
        this.description = description;
    }
}
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
app.get('/weather', async function (req, res) {
    console.log('hello');
    const lattitude = req.query.lat;
    const longtitude = req.query.lon;
    // const cityName = req.query.city_name;
    const weatherBitUrl = 'https://api.weatherbit.io/v2.0/forecast/daily';
console.log();
    try {
        const weatherbitData = await axios.get(`${weatherBitUrl}?lat=${lattitude}&lon=${longtitude}&key=${WEATHER_API_KEY}`);

        const dataAndDescription = weatherbitData.data.data.map(value => {
            return new Forcast(value.datetime, value.weather.description)
        })
        res.json(dataAndDescription)
        // console.log(dataAndDescription); 
    }
    catch (error) {
        res.json(error);
    }

});


// if(cityName){
//  const filteredWeatherData = weatherDataFile.find(ele => { 
//      return (  ele.city_name == cityName)
//     })

// }
// else {
//     // res.json(weatherDataFile)
//     res.send(weatherDataFile)
// }




// app.get('/weather', // our endpoint name
// function (req, res) { // callback function of what we should do with our request
//  res.send('Hello World from weather') // our endpoint function response
// });

// app.listen(3000) =
app.listen(PORT, () => {
    console.log(`server started on port `);
});