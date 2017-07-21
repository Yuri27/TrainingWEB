var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

function getWeather(city, callback) {
	var httpRequest = new XMLHttpRequest();
	var url_api = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=0f4dd996ec5c19547bb331992d9acd73';
	
	httpRequest.open('GET', url_api);
	httpRequest.send();

	httpRequest.onreadystatechange = function() {
		if (httpRequest.readyState === 4 && httpRequest.status === 200) {
				callback(httpRequest.status, httpRequest.responseText);
		} else{
			return;
		}
	}	
}

getWeather('Kiev', weatherShow);
getWeather('London', weatherShow);
getWeather('New York', weatherShow);


function weatherShow(error, data) {//функция callback
	if (error === 200) {// error=httpRequest.status
		var weather = JSON.parse(data);
		console.log("Погода в городе " + weather.name);
		console.log("Температура " + (weather.main.temp - 273).toFixed(1) + ' \u00B0C');
		console.log("Давление " + weather.main.pressure + " гПа");
		console.log("Влажность " + weather.main.humidity + " %");
		console.log("Облачность " + weather.clouds.all + " %");
		console.log("Скорость ветра " + weather.wind.speed + " м/с");
		console.log("________________________");
	} else{
		console.log('Ошибка: ' + error);
	}
};
