'use strict';
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
require('dotenv').config();
const getMovies = require('./Controller/Movies.controller')
const getWeather=require('./Controller/Weather.controller')
const PORT = process.env.PORT;
app.get('/weather', getWeather) 
app.get('/movies', getMovies)
app.listen(PORT, () => {
    console.log(`server started on port `);
});