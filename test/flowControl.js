var Forever = require('infinite-loop');

describe('flow Control', function () {
    describe('使用require载入模块至Forever变量', function () {
        it('Forever变量不应为null', function (done) {
            if (Forever === null) {
                throw new Error('Forever is null , unload module');
            }
            done();
        });
    });
    describe('新建一个加一函数，测试Forever模块', function () {
        it('should log something', function (done) {
            var counter = {num: 0};

            function addOne(c) {
                console.log(c.num++);
            }

            var f = new Forever();
            f.onError(function (err) {
                console.log(err);
            });
            f.add(addOne, counter).run();
            setTimeout(function () {
                done()
            }, 1000);
        })

    })
});


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
