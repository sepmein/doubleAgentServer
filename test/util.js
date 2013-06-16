var t9util = require('.././util');
var assert = require('assert');


describe('testing util', function() {
	var result = 17;

	function check(m, callback) {
		console.log(m);

		if (m < result) {
			callback(null, -1);
		} else if (m > result) {
			callback(null, 1);
		} else {
			callback(null, 0);
		}

	}

	function getResult(r) {
		console.log(r);
		assert.equal(r, result, 'the result not equal to expected');
	}

	it('bisection algorithm should get expected result', function(done) {
		t9util.bisection({big:1236, small:-100}, check, getResult);
		done();
	});
});