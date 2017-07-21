//пример http://jsbin.com/cemoyuvetu/1/edit?js,console

var async = require("async");
var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

var getWeather = async.queue(function (city, callback) {
	var httpRequest = new XMLHttpRequest();
	var url_api = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=0f4dd996ec5c19547bb331992d9acd73';
	
	httpRequest.open('GET', url_api);
	httpRequest.send();

	httpRequest.onreadystatechange = function() {
		if (httpRequest.readyState === 4) {
			callback(httpRequest.status, httpRequest.statusText);
		} else{
			return;
		}
	}
	setTimeout(function() {
		weatherShow(httpRequest.responseText);	
	}, 1000);

}, 3);

getWeather.push("Kiev", function (err, errMesagge) {
	if(err!= 200){
		console.log("Текст ошибки: " + errMesagge)
	}
});
getWeather.push("London", function (err, errMesagge) {
	if(err!= 200){
		console.log("Текст ошибки: " + errMesagge)
	}
});
getWeather.push("New York", function (err, errMesagge) {
	if(err!= 200){
		console.log("Текст ошибки: " + errMesagge)
	}
});

getWeather.drain = function() {
    console.log('Все данные о погоде получены' + "\n");
};

function weatherShow(data) {
	var weather = JSON.parse(data);
	console.log("Погода в городе " + weather.name);
	console.log("Температура " + (weather.main.temp - 273).toFixed(1) + ' \u00B0C');
	console.log("Давление " + weather.main.pressure + " гПа");
	console.log("Влажность " + weather.main.humidity + " %");
	console.log("Облачность " + weather.clouds.all + " %");
	console.log("Скорость ветра " + weather.wind.speed + " м/с");
	console.log("_____________________________________________");
};