'use strict'

const axios = require('axios');
require('dotenv').config();
const Movies = require('../models/Movies-model')
const Cache = require('../helper/cash.helper');
let cacheObject = new Cache();
const MOVIE_API_KEY = process.env.MOVIE_API_KEY;

const getMovies = async function (req, res) {
    console.log('hello from movies');
    const cityName = req.query.query;
    const moviesUrl ='https://api.themoviedb.org/3/search/movie';
    
    const dayInMilSec = 500000;
    const oneDayPassed = (Date.now() - cacheObject.timeStamp) > dayInMilSec;
    if (oneDayPassed) {
      console.log('================');
      console.log('Cache Reset');
      console.log('================');
      cacheObject = new Cache();
    }
    const foundData = cacheObject.Movies.find(movie => movie.cityName === cityName);
if(foundData){

    res.json(foundData.data)
}

else {

    const moviesData = await axios.get(`${moviesUrl}?api_key=${MOVIE_API_KEY}&query=${cityName}`)

try {
    const moviesAllDAta = moviesData.data.results.map(element => {
    return new Movies(element.title,element.overview,element.vote_average,element.vote_count,element.poster_path,element.popularity,element.release_date);
})
cacheObject.Movies.push ({

    'cityName' :cityName,
     'data' :moviesAllDAta
})

res.json(moviesAllDAta);

} 
catch (error) {
    console.log('error');
}
};
}

module.exports = getMovies;