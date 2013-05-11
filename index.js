var crawler = require('./crawler');
var db = require('./db');
var controlFlow = require('./controlFlow');

var master = controlFlow.master;

db.connect(function (err, database) {
    console.log('start crawling!');
    if (!err) {
        master.start(crawler.makeRequest, function (err, results) {
            //console.log('request made');
            if (err) {
                console.log(err);
            }
            for (var i = results.length - 1; i >= 0; i--) {
                results[i]._id = results[i].id;
                delete results[i].id;
                db.save(database, results[i], function (err) {
                    if (err) {
                        throw err;
                    }
                });
            }
        });
    } else {
        throw err;
    }
});