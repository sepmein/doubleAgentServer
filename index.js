var Crawler = require('./crawler');
var db = require('./db');

function generateTasks() {
    return Math.floor(Math.random() * 1000000);
}

for(var i = 10; i > 0; i--) {
   console.log('bla');
}

Crawler.makeRequest(generateTasks(), function (err, data) {
    db(data);
});