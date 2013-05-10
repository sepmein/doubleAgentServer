var mongodb = require('mongodb');
var async = require('async');

//console.log(mongodb);

var mongoClient = mongodb.MongoClient;

var db = Object.create(null);


db.connect = function (callback) {
    //connection
    mongoClient.connect('mongodb://localhost/doubleAgent', function (err, db) {
        console.log('Connected');
        callback(err, db);
    });

};

db.save = function (db, obj, cb) {

    //wrap around async
    async.waterfall([function (callback) {
        //collection
        if (db !== null) {
            db.collection('repositories', function (err, collection) {
                callback(err, collection);
            });
        } else {
            callback(new Error('mongodb no dbs'));
        }


    }, function (collection, callback) {
        //insert
        if (obj._id !== null && typeof obj.name) {
            collection.save(obj, function (err, result) {
                if (err) {
                    callback(err, result);
                }
                else {
                    //todo
                    //save the result to status collection
                }
            });
        } else {
            callback(new Error('some thing wrong about the obj'));
        }

    }

    ], function (err, result) {
            //传递结果
            cb(err, result);
        }

        //console.log('waterfall is done');

    );

};

module.exports = db;