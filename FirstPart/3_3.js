var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
var mas = [];

function getWeather(city) {
	return new Promise(function(resolve, reject) {
		let httpRequest = new XMLHttpRequest();
		var url_api = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=0f4dd996ec5c19547bb331992d9acd73';
		httpRequest.open('GET', url_api);

		httpRequest.onload = function() {
			// проверка статуса
			if (httpRequest.readyState === 4 && httpRequest.status === 200) {
				// Указываем обещание с текстом ответа
				resolve(weatherShow(httpRequest.responseText));
			} else {
				reject("Не удается загрузить данные");
			}
		};
		// Обработка ошибок сети
		httpRequest.onerror = function() {
			reject("Ошибка сети!");
		};
		httpRequest.send();
	});
}

mas[0]=getWeather("Kiev");
mas[1]=getWeather("London");
mas[2]=getWeather("New York");

Promise.all(mas)
.then(
	function(result){
		console.log("Выполнено");
	}, 
	function(errors){
		console.log(errors);
	});

function weatherShow(data) {
	var weather = JSON.parse(data);
	console.log("Погода в городе " + weather.name);
	console.log("Температура " + (weather.main.temp - 273).toFixed(1) + ' \u00B0C');
	console.log("Давление " + weather.main.pressure + " гПа");
	console.log("Влажность " + weather.main.humidity + " %");
	console.log("Облачность " + weather.clouds.all + " %");
	console.log("Скорость ветра " + weather.wind.speed + " м/с");
	console.log("___________________________");
};