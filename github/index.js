/*github api*/
var github = Object.create(null);
var makeRequest = require('.././crawler').makeRequest;
var targetGenerator = require('.././crawler/targetGenerator');

github.getAllUsers = function(callback) {
    var options = targetGenerator('allRepos', {});
    makeRequest(options, function(err, results) {
        callback(err, results);
    });
};

github.getAllRepos = function(callback) {
    var options = targetGenerator('allUsers', {});
    makeRequest(options, function(err, results) {
        callback(err, results);
    });
};

github.search = Object.create(null);


/*
 *  obj should be a
 *  {
 *      page : 1 ~ 10
 *      urlAppend: {
 *          type: = < > or ..
 *          args: [num] or [small num , big num] if type = ..
 *      }
 *  },
 *  callback will return
 *  err first , results second
 */
github.search.staredRepos = function(obj, callback) {
    var options = targetGenerator('staredRepos', {
        urlAppend: obj.urlAppend,
        queryString: {
            start_page: obj.page
        }
    });
    makeRequest(options, function(err, results) {
        var repos = results.repositories;
        if (!err && repos.length !== 0) {
            callback(null, repos);
        } else if (repos.length === 0) {
            callback(new Error('[get stared Repos]: the length of result = 0'), null);
        } else {
            callback(err, null);
        }
    });
};

/*
 * obj should be a
 * {
 *      urlAppend: {
 *           type: = < > or ..
 *           args: [num] or [small num , big num] if type = ..
 *      }
 * }
 * callback will return
 * 1 if length >= 1000
 * 0 if 900 < length < 1000
 * -1 if length <= 900
 * */
github.search.staredRepos.checkLength = function(obj, callback) {
    var options = targetGenerator('staredRepos', {
        urlAppend: obj.urlAppend,
        queryString: {
            start_page: 10
        }
    });
    makeRequest(options, function(err, results) {
        if (!err) {
            var l = results.repositories.length;
            if (l === 0) {
                callback(null, -1);
            } else if (l === 100) {
                callback(null, 1);
            } else if (l > 0 && l < 100) {
                callback(null, 0);
            } else {
                callback(new Error('[get s]the result length is not between 0 ~ 100'), null)
            }
        } else {
            callback(err, null);
        }
    });
};

/*
 *  obj should be a
 *  {
 *      page : 1 ~ 10
 *      urlAppend: {
 *          type: = < > or ..
 *          args: [num] or [small num , big num] if type = ..
 *      }
 *  },
 *  callback will return
 *  err first , results second
 */
github.search.followedUsers = function(obj, callback) {
    var options = targetGenerator('followedUsers', {
        urlAppend: obj.urlAppend,
        queryString: {
            start_page: 10
        }
    });
    makeRequest(options, function(err, results) {
        var users = results.users;
        if (!err && users.length !== 0) {
            callback(null, users);
        } else if (users.length === 0) {
            callback(new Error('[get watched users]: the length of result = 0'), null);
        } else {
            callback(err, null);
        }
    });
};

/*
 * obj should be a
 * {
 *      urlAppend: {
 *           type: = < > or ..
 *           args: [num] or [small num , big num] if type = ..
 *      }
 * }
 * callback will return
 * 1 if length >= 1000
 * 0 if 900 < length < 1000
 * -1 if length <= 900
 * */
github.search.followedUsers.checkLength = function(obj, callback) {
    var options = targetGenerator('followedUsers', {
        urlAppend: obj.urlAppend,
        queryString: {
            start_page: 10
        }
    });
    makeRequest(options, function(err, results) {
        if (!err) {
            var l = results.users.length;
            if (l === 0) {
                callback(null, -1);
            } else if (l === 100) {
                callback(null, 1);
            } else if (l > 0 && l < 100) {
                callback(null, 0);
            } else {
                callback(new Error('[get s]the result length is not between 0 ~ 100'), null)
            }
        } else {
            callback(err, null);
        }
    });
};

module.exports = github;