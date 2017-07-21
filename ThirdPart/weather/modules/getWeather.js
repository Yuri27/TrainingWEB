var rp = require('request-promise');
var fs = require('fs');

exports.getWeather = function(city,callback) {
    var weather = 'http://api.openweathermap.org/data/2.5/weather?q='
        + city + '&appid=0f4dd996ec5c19547bb331992d9acd73';

    rp(weather)
        .then(
            function (body){
                callback(body);
            })
        .catch(
            function (err){
                callback(err);
            })
};