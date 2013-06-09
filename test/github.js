var github = require('.././github');

describe('test github api', function(){
    describe('getAllRepos api', function(){
        it('should return a value',function(done){
            github.getAllRepos(function(err, results){
                if(err) {
                    throw err;
                }
                if(results.length) {
                    throw new Error('no results');
                }
                done();
            })
        });
    });
});