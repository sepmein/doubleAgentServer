var urlGenerator = require('.././crawler/targetGenerator');
var assert = require('assert');

describe('url Generator', function () {
    describe('生成一个供request使用的url obj', function () {
        it('应有一个since值', function (done) {
            var users = urlGenerator('users',{hello: 'world'},0);
            console.dir(users);
            if (typeof users.qs.since !== 'number') throw new Error('something wrong with url generator');
            done();
        });
    });
});