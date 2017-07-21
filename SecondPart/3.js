var rp = require('request-promise');
var fs = require('fs');

getData('Kiev');

function getData(city) {	
	var weather = 'http://api.openweathermap.org/data/2.5/weather?q='
								+ city + '&appid=0f4dd996ec5c19547bb331992d9acd73';
									
	rp(weather)
		.then(
			function (body){ 
				processData(body)
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

function processData(res){
	var parsed = JSON.parse(res);
	var dataWeather = new Buffer('Weather in the city ' + parsed.name + 
															 '\r\nTemperature ' + (parsed.main.temp - 273).toFixed(1) + ' \u00B0C' +
															 '\r\nPressure ' + parsed.main.pressure + ' гПа' +
															 '\r\nHumidity ' + parsed.main.humidity + ' %' +
															 '\r\nCloudiness ' + parsed.clouds.all + ' %' +
															 '\r\nWind speed ' + parsed.wind.speed + ' м/с' + 
															 '\r\n________________________\n');

	console.log(dataWeather.toString());
	saveToFile("файл_3.txt", dataWeather);
}

function saveToFile(file, data){
	var wstream = fs.createWriteStream(file || 'weather_3.txt');

	wstream.on('finish', function () {
		console.log('file has been written');
	});

	wstream.write(data);
	wstream.end();
};