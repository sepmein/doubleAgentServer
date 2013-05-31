var Crawler = require('.././crawler');

var assert = require('assert');

describe('Math Test', function () {
    it('1 should equals to 1', function () {
        assert.equal(1, 1);
    });
});


describe('[Web Crawler]', function () {
    describe('向github发送一个http request', function () {
        it('返回的lastId不为应为空', function (done) {
            Crawler.makeRequest({recipeName: 'allRepos', qs: {since: 100}}, function (err, lastId) {
                if (lastId === null) throw new Error('lastId 未获取');
                done();
            });
        });
    });
});