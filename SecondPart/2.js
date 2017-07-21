var request = require('request');
var fs = require('fs');

getData('Kiev',	function(err, res, body, callback) {
		processData(err, res, body, saveToFile)
});

function getData(city, callback) {	
	var weather = 'http://api.openweathermap.org/data/2.5/weather?q='
								+ city + '&appid=0f4dd996ec5c19547bb331992d9acd73';
	
	request(weather, callback)
	// Если возникла какая-либо ошибка
	.on('error', function(err) {
		console.log("Ошибка: " + err.message);
	});

};

function processData(err, res, body, callback) {
	if (res.statusCode !== 200) {
			console.log('Ошибка запроса.\n' +
									'Код состояния: ' + res.statusCode);
	}
	if (err === null && res.statusCode === 200) {
			var parsed = JSON.parse(body);
			var dataWeather = new Buffer('Weather in the city ' + parsed.name + 
																 '\r\nTemperature ' + (parsed.main.temp - 273).toFixed(1) + ' \u00B0C' +
																 '\r\nPressure ' + parsed.main.pressure + ' гПа' +
																 '\r\nHumidity ' + parsed.main.humidity + ' %' +
																 '\r\nCloudiness ' + parsed.clouds.all + ' %' +
																 '\r\nWind speed ' + parsed.wind.speed + ' м/с' + 
															 	 '\r\n________________________\n');

			console.log(dataWeather.toString());
			callback("файл_2.txt", dataWeather.toString());
	}
};

function saveToFile(file, data){
	fs.open(file || 'weather_2.txt', 'a', undefined, function(err, fd) { 
		if(err) throw err; 

		fs.write(fd, data,function(err, written) { 
			if(err) throw err; 
			console.log('Данные внесены!');

			fs.close(fd, function(err) { 
				if(err) throw err; 
				console.log('Файл сохранен!');
			}); 
		}); 
	});
};