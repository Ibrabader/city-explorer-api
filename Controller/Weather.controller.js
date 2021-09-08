'use strict';

const axios = require('axios');
require('dotenv').config();
const Forcast = require('../models/Weather-model');


const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const getWeather=  async function (req, res) {
    console.log('hello');
    const lattitude = req.query.lat;
    const longtitude = req.query.lon;
    const weatherBitUrl = 'https://api.weatherbit.io/v2.0/forecast/daily';
console.log();
    try {
        const weatherbitData = await axios.get(`${weatherBitUrl}?lat=${lattitude}&lon=${longtitude}&key=${WEATHER_API_KEY}`);
        const dataAndDescription = weatherbitData.data.data.map(value => {
            return new Forcast(value.datetime, value.weather.description)
        })
        res.json(dataAndDescription)
    }
    catch (error) {
        res.json(error);
    }

};


module.exports = getWeather;