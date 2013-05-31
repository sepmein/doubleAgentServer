var recipes = {};

//todo: make this live
var TOTALESTIMATE = {
    allRepos: 10000000,
    allUsers: 4420000
};

recipes = {
    'allRepos': {
        urlPartial: 'repos',
        queryString: {
            since: Math.floor(Math.random() * TOTALESTIMATE['allRepos'])
        }
    },
    'allUsers': {
        urlPartial: 'users',
        queryString: {
            since: Math.floor(Math.random() * TOTALESTIMATE['allUsers'])
        }
    },
    'staredRepos': {},
    'watchedUsers': {}
};

module.exports = recipes;