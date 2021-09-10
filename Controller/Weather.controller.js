'use strict';

const axios = require('axios');
require('dotenv').config();
const Forcast = require('../models/Weather-model');
const Cache = require('../helper/cash.helper');
let cacheObject = new Cache();
console.log('================');
console.log('Cache instance created');
console.log('================');

const WEATHER_API_KEY = process.env.WEATHER_API_KEY;


const getWeather=  async function (req, res) {
    console.log('hello');
    const lat = req.query.lat;
    const lon = req.query.lon;
    const dayInMilSec = 500000;
    const oneDayPassed = (Date.now() - cacheObject.timeStamp) > dayInMilSec;
    if (oneDayPassed) {
      console.log('================');
      console.log('Cache Reset');
      console.log('================');
      cacheObject = new Cache();
    }
    const foundData = cacheObject.Forcast.find(location => location.lat === lat && location.lon === lon);

    if(foundData){
    res.json(foundData.data);
     }
else {
    const weatherBitUrl = 'https://api.weatherbit.io/v2.0/forecast/daily';
    try {

        const weatherbitData = await axios.get(`${weatherBitUrl}?lat=${lat}&lon=${lon}&key=${WEATHER_API_KEY}`);
        const data = weatherbitData.data.data.map(value => {
            return new Forcast(value.datetime, value.weather.description)
        })
        cacheObject.Forcast.push({
            "lat": lat,
            "lon": lon,
            "data":data,
          });
        res.json(data)
    }
    catch (error) {
        return error
    }

};
}

module.exports = getWeather;