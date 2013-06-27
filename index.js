var crawler = require('./crawler',
    db = require('./db'),
    flowControl = require('./flowControl'),
    domain = require('domain'),
    github = require('./github');

var doubleAgent = domain.create();

doubleAgent.on('error', function (err) {
    console.trace(err);
});
doubleAgent.add(db);
doubleAgent.add(flowControl);
doubleAgent.add(crawler);


var master = flowControl.master;
/* todo make this chunk of code more elegant
* standard flow
* connect to db
* choose a collection
* make request
* save the results to collection when done
* params: database, collection, request url(generator),
*/

function crawlGithub(database, to) {
    master.start(crawler.makeRequest, {
        recipeName: 'allRepos'
    }, function (err, results) {

        //console.log('request made');
        if (err) {
            console.log(err);
        }
        for (var i = results.length - 1; i >= 0; i--) {
            results[i]._id = results[i].id;
            delete results[i].id;
            db.save(database, to, results[i], function (err) {
                if (err) {
                    throw err;
                }
            });
        }
    });
}

doubleAgent.run(
    db.connect(function (err, database) {
        console.log('start crawling!');
        if (!err) {
            master.start(
                github.getAllRepos, function (err, results) {

                    //console.log('request made');
                    if (err) {
                        console.log(err);
                    }
                    for (var i = results.length - 1; i >= 0; i--) {
                        results[i]._id = results[i].id;
                        delete results[i].id;

                        //console.log(results[i]);
                        db.save(database, 'repositories', results[i], function (err, dbSaveResult) {
                            if (err) {
                                throw err;
                            } else {
                                console.log(dbSaveResult);
                            }
                        });
                    }
                });
            master.start(
                github.getAllUsers, function (err, results) {

                    //console.log('request made');
                    if (err) {
                        console.log(err);
                    }
                    for (var i = results.length - 1; i >= 0; i--) {
                        results[i]._id = results[i].id;
                        delete results[i].id;
                        db.save(database, 'users', results[i], function (err) {
                            if (err) {
                                throw err;
                            }
                        });
                    }
                });
        } else {
            throw err;
        }
    })
);