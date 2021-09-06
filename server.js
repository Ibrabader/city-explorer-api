'use strict';

const express = require('express') // require the express package
const app = express() // initialize your express app instance
const cors = require('cors');
app.use(cors())
 class Forcast {
    constructor (date,description) {
     this.date=date;
     this.description=description;
 }

 }
const weatherDataFile = require ('./data/weather.json')

app.get('/weather', 
 function (req, res) { 

    const cityName = req.query.city_name;

if(cityName){
 const filteredWeatherData = weatherDataFile.find(ele => { 
     return (  ele.city_name == cityName)
    })
    const dataAndDescription = filteredWeatherData.data.map(value => { 
        return new Forcast ( value.datetime , value.weather.description) 
}) 
    res.json(dataAndDescription) 
}
else {
    // res.json(weatherDataFile)
    res.send(weatherDataFile)
}



});
// app.get('/weather', // our endpoint name
// function (req, res) { // callback function of what we should do with our request
//  res.send('Hello World from weather') // our endpoint function response
// });

// app.listen(3000) =
app.listen(3003, () => { 
console.log('server started on port ');
});