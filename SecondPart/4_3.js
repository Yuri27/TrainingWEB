var api = require('./api.js')
var async = require("async");
var cityWeather = ['Kiev', 'London', 'New York'];
var fileName = '12.txt';

async.eachSeries(cityWeather,  
	
	function(item,callback){
		api.getWeather(item,fileName,callback);
	},

	function(err){
		if(err){
			console.log(err);
		}
	}
);