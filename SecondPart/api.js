var rp = require('request-promise');
var fs = require('fs');
var exports = module.exports = {};

exports.getWeather = function(city,fileName,callback) {	
	var weather = 'http://api.openweathermap.org/data/2.5/weather?q='
				  + city + '&appid=0f4dd996ec5c19547bb331992d9acd73';
	rp(weather)
		.then(
			function (body){
				processData(body,fileName);
				
				callback();
			})
		.catch(
			function (err){
				if(err.statusCode === 404){
					console.log(err.message);
				}
				else if(err.name === 'RequestError'){
					console.log('Network eror');
				}
				else{
					console.log(err.message);
				}
			})
};

function processData(res,fileName){
	var parsed = JSON.parse(res);
	var dataWeather = new Buffer('Weather in the city ' + parsed.name + 
								 '\r\nTemperature ' + (parsed.main.temp - 273).toFixed(1) + ' \u00B0C' +
								 '\r\nPressure ' + parsed.main.pressure + ' гПа' +
								 '\r\nHumidity ' + parsed.main.humidity + ' %' +
								 '\r\nCloudiness ' + parsed.clouds.all + ' %' +
								 '\r\nWind speed ' + parsed.wind.speed + ' м/с' + 
								 '\r\n________________________\r\n');

	console.log(dataWeather.toString());
	saveToFile(fileName, dataWeather);
}

function saveToFile(file, data){
fs.open(file/* || 'weather_4.txt'*/, 'a', undefined, function(err, fd) { 
		if(err) throw err; 

		fs.write(fd, data,function(err, written) { 
			if(err) throw err;

			fs.close(fd, function(err) { 
				if(err) throw err;
				console.log('File has been saved!');
			}); 
		}); 
	});
};