var db = require('.././db');
var secret = require('.././config');
var extend = require('.././util').extend;
//todo: make this live
var TOTALESTIMATE = {
	repositories: 10000000,
	users: 4420000
};

//token = 0 , default token
//token = 1, second token
var TargetUrl = function(urlPartial, queryString, whichToken) {
	this.urlPartial = urlPartial;
	this.queryString = queryString;
	this.token = secret[whichToken];
};

TargetUrl.prototype.generate = function() {
	var url = 'https://api.github.com/' + this.urlPartial;
	var qs = {
		'client_id': this.token.client_id,
		'client_secret': this.token.client_secret
	};
	if (this.queryString) {
		extend(qs, this.queryString);
	}
	return {
		url: url,
		qs: qs,
		headers: {
			"User-Agent": "Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.31 (KHTML, like Gecko) Chrome/26.0.1410.64 Safari/537.31"
		}
	}
};

/*TargetUrl.prototype.estimate = function () {

 };*/

function generate(recipe, queryString, whichToken) {
	var ts;
	if (recipe === 'repositories' || recipe === 'users') {
		var qs = {
			since: Math.floor(Math.random() * TOTALESTIMATE[recipe])
		};
		if (queryString) {
			extend(qs, queryString);
		}
		ts = new TargetUrl(recipe, qs, whichToken);
		return ts.generate();
	} else {
		ts = new TargetUrl(recipe, queryString, whichToken);
		return ts.generate();
	}
}

function dontRecrawl(recipe, queryString, whichToken) {
	var options = generate(recipe, queryString, whichToken);
	db.connect()
}


module.exports = generate;