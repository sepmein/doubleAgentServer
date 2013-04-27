var request = require('request');
var async = require('async');

var getRepositoriesSeries = function getRepositoriesSeries(arg, callback) {
	var option = (function(argument) {
		var querySince;
		if (argument > 0) {
			querySince = argument;
		} else {
			querySince = 0;
		};
		return {
			url: "https://api.github.com/repositories",
			qs: {
				since: argument
			}
		}
	})(arg);

	request(option, function(error, response, body) {
		var results = JSON.parse(body);
		var lastId = results[results.length - 1].id;
		console.log(lastId);
		callback(null, lastId);
	});
};

async.waterfall(
[function(callback) {
	getRepositoriesSeries(null, callback);
},

function(arg, callback) {
	getRepositoriesSeries(arg, callback);
}, function(arg, callback) {
	getRepositoriesSeries(arg, callback);
}, function(arg, callback) {
	getRepositoriesSeries(arg, callback);
}, function(arg, callback) {
	getRepositoriesSeries(arg, callback);
}]);

// var queue = async.queue(function(task, callback){
// 	getRepositoriesSeries(task, callback);
// })