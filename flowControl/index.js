'use strict';

var t9Util = require('.././util'),
    inherits = require('util').inherits,
    async = require('async'),
    Infiniteloop = require('infinite-loop'),
    EventEmitter = require('events').EventEmitter,

// the limitation is 720ms/request
    REQUEST_INTERVAL = 730,

/*
 * create a task, run that task, get a result from that task, create a task based on that
 * when task finished deliver the data to the controller and db
 * send a message to the controller
 * controller delete task
 * */

    flowControl = {};

//master controller
flowControl.master = new EventEmitter();

//Object.getPrototypeOf(master);
flowControl.master.on('taskFinished', function (seal, produce) {
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
flowControl.master.on('taskUnfinished', function (seal) {

});

//master work flow:
//just assign the work, not knowing about the consumption of the system
flowControl.master.start = function alwaysWorking(fn, cb) {

    //var f = new Forever();
    setImmediate(function () {
        setTimeout(function () {
            if (typeof fn === 'function') {

                //console.log('working with master\s jobs and the since is ' + self.since);

                //TODO 如何解决cb前有多个参数的问题？？？
                fn(cb);
            } else {
                console.log(typeof fn);
                console.log('from slave: nothing todo');
            }
            alwaysWorking(fn, cb);
        }, REQUEST_INTERVAL);

    });
    /*
     * setInterval(function () {
     * if (typeof fn === 'function') {
     * //console.log('working with master\s jobs and the since is ' + self.since);
     * fn(Math.floor(Math.random() * 10000000), cb);
     * } else {
     * console.log('from slave: nothing todo');
     * }
     * }, REQUEST_INTERVAL);
     * */
};

/*
 * data level of jobs
 * var job = function (content, whenDone) {
 *  //just for test
 *  var produce = 0;*    produce++;
 *  //console.log(produce);
 *  whenDone(produce);
 * };
 * */


//prototype of Slave
//seal is the only id of the slave
var Slave = function Slave(since) {

    //EventEmitter.call(this);
    this.seal = t9Util.generateRandom(20);

    //todo 随机生成since，根据repository总量
    this.since = since || Math.floor(Math.random() * 10000000);
    this.produce = null;
};

//when task is finished send a message to master
//当任务完成时，向主人发送一条消息
Slave.prototype.sendMessageToMaster = function () {

    //console.log('[called] slave.sendMessageToMaster');
    if (this.produce !== null) {
        flowControl.master.emit('taskFinished', this.seal, this.produce);
    } else {
        flowControl.master.emit('taskUnfinished', this.seal);
    }
};
Slave.prototype.workWork = function (fn, cb) {
    if (typeof fn === 'function') {

        //console.log('working with master\s jobs and the since is ' + self.since);
        fn(this.since, cb);
    } else {
        console.log('from slave: nothing todo');
    }

};

//inherits(Slave, EventEmitter);

//slaves
//Data level about slave
var slaves = {};

//slave names
slaves.list = {};

//born a baby slave
//@type: function
//@param: Since (type:num) - github api params get repositories from 'since'
slaves.bornABabySlave = function (since) {

    //console.log('[called] bornABabySlave');
    var newBornSlave = new Slave(since);
    this.list[newBornSlave.seal] = newBornSlave;

    //console.dir(this.list);
    return newBornSlave;
};

//kill the elder slave, free memory in order to get job cycled
//@type: function
//@param: seal, generated at the borning state of a baby slave
slaves.killTheElderSlave = function (seal) {
    var killed = delete this.list[seal];
    return killed;
};

module.exports = flowControl;

