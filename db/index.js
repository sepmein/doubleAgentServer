var mongodb = require('mongodb'),
    async = require('async'),
    EventEmitter = require('events').EventEmitter,
    mongoClient = mongodb.MongoClient,
    db = new EventEmitter();

db.connect = function (callback) {

    //connection
    mongoClient.connect('mongodb://localhost/doubleAgent', function (err, db) {
        if (err) {
            this.emit('error', err);
        } else {
            console.log('Connected');
            callback(err, db);
        }
    }.bind(this));

};

db.checkSaved = function (ee, db, coll, obj, cb) {

    async.waterfall([
        function (callback) {
            if (db !== null) {
                db.collection(coll, function (err, collection) {
                    callback(err, collection);
                })
            } else {
                callback(new Error('mongodb no dbs'));
            }
        },
        function (collection, callback) {
            collection.findOne({
                "_id": obj._id
            }, function (err, result) {
                if (err) {
                    callback(err);
                } else if (result !== null) {
                    callback(null, {
                        ok: 1
                    });
                } else callback(null, {
                    ok: 0
                });
            });
        }
    ], function (err, result) {
        if (err) ee.emit('error', err);
        else cb(result);
    });
};

db.save = function (db, coll, obj, cb) {

    //wrap around async
    async.waterfall([
        function (callback) {

            //collection
            if (db !== null) {
                db.collection(coll, function (err, collection) {
                    callback(err, collection);
                });
            } else {
                callback(new Error('mongodb no dbs'));
            }

        },
        function (collection, callback) {

            //insert
            if (obj._id !== null && typeof obj.name) {
                collection.save(obj, function (err, result) {
                    callback(err, result);
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