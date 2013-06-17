var db = require('../.././db'),
secret = require('../.././config'),
extend = require('../.././util').extend,
recipes = require('./recipes');,
BASE_URL = 'https://api.github.com/';

var TargetUrl = function(recipe, queryArg) {
    this.recipe = recipe;
    this.queryArg = queryArg;
    //随机tokenId
    var tokenId = Math.floor((Object.keys(secret).length - 1) * Math.random());
    this.token = secret[tokenId];
};

TargetUrl.prototype.generate = function() {
    var qs = {
        'client_id': this.token.client_id,
        'client_secret': this.token.client_secret
    };
    //extend recipe qs
    extend(qs, this.recipe.qs);
    //extend custom qs
    if (this.queryArg.queryString) {
        extend(qs, this.queryArg.queryString);
    }
    //append custom url partial
    if (this.queryArg.urlAppend) {
        this.recipe.urlAppend(this.queryArg.urlAppend);
    }
    var url = BASE_URL + this.recipe.urlPartial;
    return {
        url: url,
        qs: qs,
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.31 (KHTML, like Gecko) Chrome/26.0.1410.64 Safari/537.31"
        }
    }
};

/*  API
    example
    generate(
        'staredRepos', {
            urlAppend: {
                type: '..',
                args: [130, 230]
            },
            queryString: {
                start_page : 10
            }
        }
*/

function generate(recipe, queryArg) {
    if (!recipes[recipe]) {
        console.error(new Error('You"ve enter a wrong recipe name, change it!'));
    }
    var r = recipes[recipe];
    var ts = new TargetUrl(r, queryArg);
    return ts.generate();
}

module.exports = generate;