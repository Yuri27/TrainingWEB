var http = require('http');
var fs = require('fs');

getData('Kiev', 
	function(res, callback) {
		processData(res, saveToFile)
});

function getData(city, callback) {	
	var weather = 'http://api.openweathermap.org/data/2.5/weather?q=' 
								+ city + '&appid=0f4dd996ec5c19547bb331992d9acd73';

	http.get(weather, callback)
	// Если возникла какая-либо ошибка
	.on('error', function(err) {
		console.log("Ошибка: " + err.message);
	});

};

function processData(res, callback) {
	console.log("This is processData");
	const { statusCode } = res;
	let error;
		if (statusCode !== 200) {
			error = new Error('Ошибка запроса.\n' +
												'Код состояния: ' + statusCode);
		}
		if (error) {
			console.error(error.message);
			// Удаляем данные ответа для освобождения памяти
			res.resume();
			return;
		}

		var body = '';

		res.on('data', function(data){
			body += data;
		});
		
		res.on('end', function() {
			try {
				console.log(body);
				var parsed = JSON.parse(body);
				var dataWeather = new Buffer('Weather in the city ' + parsed.name + 
																		 '\r\nTemperature ' + (parsed.main.temp - 273).toFixed(1) + ' \u00B0C' +
																		 '\r\nPressure ' + parsed.main.pressure + ' гПа' +
																		 '\r\nHumidity ' + parsed.main.humidity + ' %' +
																		 '\r\nCloudiness ' + parsed.clouds.all + ' %' +
																		 '\r\nWind speed ' + parsed.wind.speed + ' м/с' + 
																		 '\r\n________________________\n');

				console.log(dataWeather.toString());
				callback('', dataWeather);
			}catch (err) {
      	console.error(err.message);
    	}
		});		
};

function saveToFile(file, data){
	//console.log("This is saveToFile");

	fs.writeFile(file || 'weather.txt', data, 'utf8', (err) => {
		if (err) throw err;
			console.log('Файл сохранен!');
	});

};