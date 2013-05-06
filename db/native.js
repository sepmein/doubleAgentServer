var mongodb = require('mongodb');
var async = require('async');

//console.log(mongodb);

var mongoClient = mongodb.MongoClient;

var db = Object.create(null);


db.connect = function(callback) {
	//connection
	mongoClient.connect('mongodb://localhost/test', function(err, db) {
		console.log('Connected');
		callback(err, db);
	});

};
db.insert = function(db, obj, cb) {

	//wrap around async
	async.waterfall([function(callback) {
		//collection
		if (db !== null) {
			db.collection('test', function(err, collection) {
				callback(err, collection);
			});
		} else {
			callback(new Error('mongodb no dbs'));
		}


	}, function(collection, callback) {
		//insert
		var something = {
			hello: 'world'
		};
		console.log(something);
		collection.insert(something, {
			w: 1
		}, function(err, result) {
			callback(err, result);
		});

	}

	], function(err, result) {
		//传递结果
		cb(err, result);
	}

	//console.log('waterfall is done');

	);

};

module.exports = db;