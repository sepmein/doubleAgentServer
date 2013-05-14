var crawler = require('./crawler');
var db = require('./db');
var controlFlow = require('./controlFlow');

var master = controlFlow.master;
// todo make this chunk of code more elegant
// standard flow
// connect to db
// choose a collection
// make request
// save the results to collection when done
// params: database, collection, request url(generator),
var Job = function (name, params, todoList) {

    this.name = name;
    this.params = params;
    this.todoList = todoList;

};
Job.prototype.onFinish = function (err, results) {
    if (err) {
        console.log(err);
    }
    for (var i = results.length - 1; i >= 0; i--) {
        for (var u = this.todoList.length - 1; u >= 0; u--) {
            this.todoList[u](results[i]);
        }
    }
}

function crawlGithub(database, to, token) {
    master.start(crawler.makeRequest, {to: to, token: token}, function (err, results) {
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

db.connect(function (err, database) {
    console.log('start crawling!');
    if (!err) {
        master.start(crawler.makeRequest, {to: 'repositories', token: 0}, function (err, results) {
            //console.log('request made');
            if (err) {
                console.log(err);
            }
            for (var i = results.length - 1; i >= 0; i--) {
                results[i]._id = results[i].id;
                delete results[i].id;
                db.save(database, 'repositories', results[i], function (err) {
                    if (err) {
                        throw err;
                    }
                });
            }
        });
        master.start(
            crawler.makeRequest,
            {
                to: 'users',
                token: 1
            },
            function (err, results) {
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

                    crawler.makeRequest(
                        {
                            to: 'users/' + results[i].login + '/followers',
                            qs: {
                                per_page: 1
                            },
                            token: 2
                        }
                        , function (err, results, response) {
                            console.log('made some results');
                            console.log(results);
                            console.dir(response.headers);
                        });
                }
            });
    } else {
        throw err;
    }
});

