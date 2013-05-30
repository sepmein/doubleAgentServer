var db = require('../.././db');
var secret = require('../.././config');
var extend = require('../.././util').extend;

var recipes = require('./recipes');

var TargetUrl = function (recipe, queryString) {
    this.recipe = recipe;
    this.queryString = queryString;
    //随机tokenId
    var tokenId = Math.floor((Object.keys(secret).length - 1) * Math.random());
    this.token = secret[tokenId];
};

TargetUrl.prototype.generate = function () {
    var url = 'https://api.github.com/' + this.recipe.urlPartial;
    var qs = {
        'client_id': this.token.client_id,
        'client_secret': this.token.client_secret
    };
    if (this.queryString) {
        extend(qs, this.queryString);
    }
    if (this.recipe.queryString) {
        extend(qs, this.recipe.queryString);
    }
    return {
        url: url,
        qs: qs,
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.31 (KHTML, like Gecko) Chrome/26.0.1410.64 Safari/537.31"
        }
    }
};

function generate(recipe, queryString) {
    if (!recipes[recipe]) {
        console.error(new Error('You"ve enter a wrong recipe name, change it!'));
    }
    var r = recipes[recipe];
    var ts = new TargetUrl(r, queryString);
    return ts.generate();
}

/*function dontRecrawl(recipe, queryString, whichToken) {
 var options = generate(recipe, queryString, whichToken);
 db.connect()
 }*/


module.exports = generate;