var urlGenerator = require('../crawler/targetGenerator/index');
var assert = require('assert');

describe('url Generator', function () {
    describe('生成一个供request使用的url obj', function () {
        it('应有一个since值', function (done) {
            var users = urlGenerator('allUsers', {hello: 'world'});
            console.dir(users);
            if (typeof users.qs.since !== 'number') throw new Error('something wrong with url generator');
            done();
        });
    });
});