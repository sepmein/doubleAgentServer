'use strict';

var t9Util = require('.././util');
var inherits = require('util').inherits;
var async = require('async');


// the limitation is 720ms/request
var REQUESTINTERVAL = 730;
// create a task, run that task, get a result from that task, create a task based on that

//when task finished deliver the data to the controller and db
//send a message to the controller
//controller delete task

var controlFlow = Object.create(null);

//master controller
var EventEmitter = require('events').EventEmitter;
controlFlow.master = Object.create(EventEmitter.prototype);
//Object.getPrototypeOf(master);
controlFlow.master.on('taskFinished', function(seal, produce) {
	if (produce <= 10000) {
		//console.log('[called] master.on.taskFinished');
		//elder's produce is new born's since
		//var since = produce;
		//delete the elder one, free memory
		slaves.killTheElderSlave(seal);
		//create a new slave, 依赖slaves
		var newSlave = slaves.bornABabySlave();
		//assign him a job
		newSlave.workWork();
	} else {

	}
});
controlFlow.master.on('taskUnfinished', function(seal) {

});
//master work flow:
//just assign the work, not knowing about the consumption of the system
//
controlFlow.master.start = function(fn, cb) {
	setInterval(function() {
		slaves.bornABabySlave().workWork(fn, cb);
	}, REQUESTINTERVAL);
}

//data level of jobs
var job = function(content, whenDone) {
	//just for test
	var produce = 0;
	produce++;
	//console.log(produce);
	whenDone(produce);
};


//prototype of Slave
//seal is the only id of the slave
//印章是奴隶的唯一标示
var Slave = function Slave(since) {
	//EventEmitter.call(this);
	this.seal = t9Util.generateRandom(20);
	//todo 随机生成since，根据repository总量
	this.since = since || Math.floor(Math.random() * 10000000);
	this.produce = null;
};
//when task is finished send a message to master 
//当任务完成时，向主人发送一条消息
Slave.prototype.sendMessageToMaster = function() {
	//console.log('[called] slave.sendMessageToMaster');
	if (this.produce !== null) {
		master.emit('taskFinished', this.seal, this.produce);
		//console.log(this.seal);
		//console.log('blabla');
	} else {
		master.emit('taskUnfinished', this.seal);
	}
};
Slave.prototype.workWork = function(fn, cb) {
	var self = this;
	if (typeof fn === 'function') {
		//console.log('working with master\s jobs and the since is ' + self.since);
		fn(self.since, cb);
	} else {
		console.log('from slave: nothing todo');
	}

};
//inherits(Slave, EventEmitter);

//slaves
//Data level about slave
var slaves = Object.create(null);
//slave names
slaves.list = {};
//born a baby slave
//@type: function
//@param: Since (type:num) - github api params get repositories from 'since'
slaves.bornABabySlave = function(since) {
	//console.log('[called] bornABabySlave');
	var newBornSlave = new Slave(since);
	this.list[newBornSlave.seal] = newBornSlave;
	//console.dir(this.list);
	return newBornSlave;
};
//kill the elder slave, free memory in order to get job cycled
//@type: function
//@param: seal, generated at the borning state of a baby slave
slaves.killTheElderSlave = function(seal) {
	//console.log('[called] killTheElderSlave');
	//console.log(this.list);
	var killed = delete this.list[seal];
	return killed;
};

module.exports = controlFlow;

//test codes
//var assert = require('assert');
//var slave1 = new Slave();
//新建slave对象应成功，该对象应有一个seal值
//assert.notEqual(slave1.seal, null);
//重新新建的slave对象应与刚才建立的对象不同
//var slave2 = new Slave();
//assert.notEqual(slave1.seal, slaves.seal);

//var babySlave = slaves.bornABabySlave(0);
//babySlave.workWork();
//var killed = slaves.killTheElderSlave(babySlave.seal);
//assert.strictEqual(killed, true);
//
//master.start(4);