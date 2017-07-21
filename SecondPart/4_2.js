var api = require('./api.js')
var async = require("async");
var cityWeather = ['Kiev', 'London', 'New York'];
var fileName = 'file_42.txt';

async.each(cityWeather,  
	function(item,fileName,callback){
		api.getWeather(item,fileName,callback);
	},

	function(err){
		if(err){
			console.log(err);
		}
	}
);