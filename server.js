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
class Movies {
constructor ( title ,overview,vote_average,vote_count,poster_path,popularity,release_date) {
    this.title = title;
    this.overview = overview;
    this.vote_average = vote_average;
    this.vote_count = vote_count;
    this.poster_path = poster_path;
    this.popularity = popularity;
    this.release_date = release_date;

}
}
const MOVIE_API_KEY = process.env.MOVIE_API_KEY;
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
app.get('/weather', async function (req, res) {
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

});

app.get('/movies',async function (req, res) {
    console.log('hello from movies');
    const cityName = req.query.query;
    const moviesUrl ='https://api.themoviedb.org/3/search/movie';

try {
    

    const moviesData = await axios.get(`${moviesUrl}?api_key=${MOVIE_API_KEY}&query=${cityName}`)
    const moviesAllDAta = moviesData.data.results.map(element => {
    return new Movies(element.title,element.overview,element.vote_average,element.vote_count,element.poster_path,element.popularity,element.release_date);
})

res.json(moviesAllDAta);

} 
catch (error) {
    console.log('error');
}
});


app.listen(PORT, () => {
    console.log(`server started on port `);
});