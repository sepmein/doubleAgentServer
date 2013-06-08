var github = require('.././github');

describe('github api, ' ,function(){
	describe('get all repos', function () {
		it('should return some result', function  (done) {
			github.getAllRepos(function (err, results) {
				if(results.length === 0 ) {
					throw new Error('no result!');
				}
			})
		});
	});
});