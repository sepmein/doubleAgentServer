//重构api

/*
 * 1. 创立一个并行，可扩展的结构，并将其封装至一个master下
 *   master
 *       properties:
 *           a. tickTock int
 *           b. task obj Task
 *           c. concurrency int
 *           d. prerequisite
 *       functions:
 *           a. 增加减少concurrency
 *           b. 根据concurrency调整tickTock
 *           c. 调整task队列
 *           d. prepare
 *           e. todo http rest api for master control
 *
 *   task
 *       properties:
 *           a. fn fn
 *           b. params
 *           c. judgement
 *       functions:
 *           a. addFn
 *           b. judge
 *               return 0 or 1 as result
 *
 * */

// create task with fn

// setup env

// create master with task


//basic of the basic

var util = require('util');
var ee = require('events').EventEmitter;


var Forever = function() {
	ee.call(this);
};

util.inherits(Forever, ee);

Forever.prototype.add = function() {
	if ('function' === typeof arguments[0]) {
		this.handler = arguments[0];
		var args = Array.prototype.slice.call(arguments, 1);
		if (args.length > 0) {
			this.args = args;
		}
	} else {
		this.emit('error', new Error('when using add function, the first argument should be a function'));
		return 0;
	}
	return this;
}

Forever.prototype.invoke = function() {
	var handler = this.handler;
	var args = this.args;
	var that = this;

	setImmediate(function() {
		if (typeof handler === 'function') {

			switch (args.length) {
				// fast cases
				case 0:
					handler.call(that);
					that.invoke();
					break;
				case 1:
					handler.call(that, args[0]);
					that.invoke();
					break;
				case 2:
					handler.call(that, args[0], args[1]);
					that.invoke();
					break;
					// slower
				default:
					handler.apply(that, args);
					that.invoke();
			}
		} else {
			//no function added
			that.emit('error', new Error('no function has been added to Forever'));
		}
	});

};

Forever.prototype.onError = function(errHandler) {
	if ('function' === typeof errHandler) {
		this.on('error', errHandler);
	} else {
		this.emit('error', new Error('typeof onError argument should be a function'));
	}
};

module.exports = Forever;


//test
var counter = {num: 0};

function addOne(c) {
	console.log(c.num++);
}
var f = new Forever();
f.onError(function(err) {
	console.log(err);
});
f.add(addOne, counter).invoke();