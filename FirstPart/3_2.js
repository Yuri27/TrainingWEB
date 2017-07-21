var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

function getWeather(city) {
	return new Promise(function(resolve, reject) {
		var httpRequest = new XMLHttpRequest();
		var url_api = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=0f4dd996ec5c19547bb331992d9acd73';
		httpRequest.open('GET', url_api);

		httpRequest.onload = function() {
			// проверка статуса
			if (httpRequest.readyState === 4 && httpRequest.status === 200) {
				// Указываем обещание с текстом ответа
				resolve(httpRequest.responseText);
			} else {
				// принимаем текст состояния
				// Который, будет ошибкой
				reject(httpRequest.statusText);
			}
		};
		// Обработка ошибок сети
		httpRequest.onerror = function() {
			reject("Ошибка сети!");
		};
		httpRequest.send();
	});
}

getWeather('Kiev')
.then(

	function(response) {
		weatherShow(response);
	},

		getWeather("London")
		.then(
			function(response) {
				weatherShow(response);
			},

				getWeather("New York")
				.then(
					function(response) {
						weatherShow(response);
					},
					function(error) {
						console.log("Ошибка: ", error);
					}),

			function(error) {
				console.log("Ошибка: ", error);
			}),

	function(error) {
		console.log("Ошибка: ", error);
	}
);

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