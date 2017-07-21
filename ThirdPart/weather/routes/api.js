var express = require('express');
var router = express.Router();
var getWeather = require('../modules/getWeather');

module.exports = function(app) {
    app.get("/", function(req, res,next){
        res.send("<h1>Главная страница</h1>" +
            "<h2>To record weather data in the database, enter the address "+
            "<a style='color: #00B7FF;'>http://localhost:3000/api/getWeather/:city</a> where <i style='color: green;'>':city'</i> is the city name </h2>" +
            "<h2>To display meteorological data from the database, enter the address " +
            "<a style='color: #00B7FF;'>http://localhost:3000/latest_data/:id</a> where <i style='color: green;'>':id'</i> is the city number in the database</h2>");
    });

    app.get('/api/getWeather/:city', function(req, res, next) {
        const db = app.get('db');
        var cityName=req.params.city;

        getWeather.getWeather(cityName, processData);

        function processData(data){
            if(data.statusCode === 404){
                res.render('error', {
                    title: 'error',
                    subtitle: 'Here you will see detailed information about the error',
                    status: data.statusCode,
                    message: 'Error:' + data.message,
                    stack: '' + data.stack
                })
            }
            else if(data.name === 'RequestError'){
                res.render('error', {
                    title: 'error',
                    subtitle: 'Here you will see detailed information about the error',
                    status:  '',
                    message: 'Network eror',
                    stack: data.stack
                })
            }
            else{
                var d = db.yuri27.weather.insert({
                date: new Date(),
                city: cityName,
                data: data
                }).then(function () {
                    res.render('success', {
                        title: 'success',
                        subtitle: 'Request status',
                        message: 'Congratulations, the record about "' + cityName + '" was successfully added!'
                    })
                }).catch(function(err) {
                    res.render('error', {
                        title: 'error',
                        subtitle: 'Here you will see detailed information about the error',
                        message: 'Error Request\n' + err,
                        status:  '',
                        stack: ''
                    })
                });
            }
        };
    });
    return router;
};