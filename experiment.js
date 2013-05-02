'use strict';

var util = require('./util');
// create a task, run that task, get a result from that task, create a task based on that

//when task finished deliver the data to the controller and db
//send a message to the controller
//controller delete task

//master controller
var EventEmitter = require('events').EventEmitter;
var master = Object.create(EventEmitter.prototype);
//Object.getPrototypeOf(master);
master.on('taskFinished', function(seal, produce) {
	slaves.bornABabySlave(since, this.job);
	slaves.killTheElderSlave(seal);
	//	console.log('taskFinished and since is :' + since);
});
master.on('taskUnfinished',function(seal){

});

//data level of jobs
var job = function(cb){
	//just for testment
	cb('job done');
};


//prototype of Slave
//seal is the only id of the slave
//印章是奴隶的唯一标示
var Slave = function Slave(since, job) {
	this.seal = util.generateRandom(20);
	this.since = since || 0;
	this.produce = null;
	this.job = job || null;
};
//when task is finished send a message to master 
//当任务完成时，向主人发送一条消息
Slave.prototype.sendMessageToMaster = function() {
	if (this.produce !== null) {
		master.emit('taskFinished', this.seal, this.produce);
	} else {
		master.emit('taskUnfinished', this.seal);
	}

};
Slave.prototype.workWork = function(job) {
	var self = this;
	function whenDone(produce){
		self.produce = produce;
		self.sendMessageToMaster();
	}
	job(whenDone);
};

//slaves
//Data level about slave
var slaves = Object.create(null);
//slave names
slaves.list = {};
//born a baby slave
//@type: function
//@param: Since (type:num) - github api params get repositories from 'since'
slaves.bornABabySlave = function(since, job) {
	var newBornSlave = new Slave(since, job);
	this.list[newBornSlave.seal] = newBornSlave;
	console.dir(this.list);
	return newBornSlave.seal;
};
//kill the elder slave, free memory in order to get job cycled
//@type: function
//@param: seal, generated at the borning state of a baby slave
slaves.killTheElderSlave = function(seal) {
	var killed = delete this.list[seal];
	return killed;
};



//test codes
var assert = require('assert');
var slave1 = new Slave();
//新建slave对象应成功，该对象应有一个seal值
assert.notEqual(slave1.seal, null);
//重新新建的slave对象应与刚才建立的对象不同
var slave2 = new Slave();
assert.notEqual(slave1.seal, slaves.seal);

var babySeal = slaves.bornABabySlave(100);
var killed = slaves.killTheElderSlave(babySeal);
assert.strictEqual(killed, true);