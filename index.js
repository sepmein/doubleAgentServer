var Crawler = require('./crawler');
var db = require('./db/native');
var experiment = require('./experiment');
var async = require('async');

// function generateTasks() {
//     return Math.floor(Math.random() * 1000000);
// }

// function fnn(){
//     Crawler.makeRequest(generateTasks(), function (err, data, lastId) {
//         db(lastId);
//     });
// }

// var stackTracer = 0;
// function fn(next){
//     stackTracer ++;
//     console.log(stackTracer);
//     next();
// }

// function forever(fn, callback) {
//     function next() {
//         fn(next);
//     }
//     next();
// }

// forever(fn, function(err){
//     console.log(err);
// });

var master = experiment.master;

db.connect(function(err, database) {
    if (!err) {
        master.start(Crawler.makeRequest, function(err, results) {
            console.log('request made');
            for (var i = results.length - 1; i >= 0; i--) {
                db.insert(database, results[i], function(err, results) {
                    if (err) {
                        throw err;
                    }
                });
            };
        });
    } else {
        throw err;
    }
});