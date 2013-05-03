var Crawler = require('./crawler');
var db = require('./db');
var async = require('async');

function generateTasks() {
    return Math.floor(Math.random() * 1000000);
}

function fnn(){
    Crawler.makeRequest(generateTasks(), function (err, data, lastId) {
        db(lastId);
    });
}

var stackTracer = 0;
function fn(next){
    stackTracer ++;
    console.log(stackTracer);
    next();
}

function forever(fn, callback) {
    function next() {
        fn(next);
    }
    next();
}

forever(fn, function(err){
    console.log(err);
});
