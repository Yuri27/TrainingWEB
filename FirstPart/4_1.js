var async = require('async');
var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

function getWeather(city, callback) {
	var httpRequest = new XMLHttpRequest();
	var url_api = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=0f4dd996ec5c19547bb331992d9acd73';
	
	httpRequest.open('GET', url_api);
	httpRequest.send();

	httpRequest.onreadystatechange = function() {
	//console.log("state change: " + httpRequest.readyState + " / " + httpRequest.status);
	if (httpRequest.readyState === 4) {
			callback(httpRequest.status, httpRequest.responseText);
	} else{
			return;
		}
	}	
}

async.series([
	function(callback) {
		getWeather("Kiev", weatherShow);
		callback(null, "Kiev");		
	},
	function(callback) {
		getWeather("London", weatherShow);
		callback(null, "London");
	},
	function(callback) {
		getWeather("New York", weatherShow);
		callback(null, "New York");
	}], 
	function(err,results) {
		if (err != null){
			console.log(results);
	} // вывод всех callback
});

function weatherShow(error, data) {//функция callback
	if (error === 200) {// error=httpRequest.status
		var weather = JSON.parse(data);
		console.log("Погода в городе " + weather.name);
		console.log("Температура " + (weather.main.temp - 273).toFixed(1) + ' \u00B0C');
		console.log("Давление " + weather.main.pressure + " гПа");
		console.log("Влажность " + weather.main.humidity + " %");
		console.log("Облачность " + weather.clouds.all + " %");
		console.log("Скорость ветра " + weather.wind.speed + " м/с");
		console.log("__________________________");
	} else{
		console.log('Ошибка: ' + error);
	}
};