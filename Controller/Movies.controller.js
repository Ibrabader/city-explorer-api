'use strict'

const axios = require('axios');
require('dotenv').config();
const Movies = require('../models/Movies-model')
const MOVIE_API_KEY = process.env.MOVIE_API_KEY;

const getMovies = async function (req, res) {
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
};


module.exports = getMovies;