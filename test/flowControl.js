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
            var counter = 0;

            function addOne(c) {
                console.log(c++);
            }

            var f = new Forever();
            f.onError(function (err) {
                console.log(err);
            });
            f.add(addOne, counter).invoke();
            setTimeout(function () {
                done()
            }, 1000);
        })

    })
});