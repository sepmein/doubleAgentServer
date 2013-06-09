//todo: make this live
var TOTALESTIMATE = {
    allRepos: 10000000,
    allUsers: 4420000
};

var recipes = {
    'allRepos': {
        urlPartial: 'repositories',
        qs: {
            since: Math.floor(Math.random() * TOTALESTIMATE['allRepos'])
        }
    },
    'allUsers': {
        urlPartial: 'users',
        qs: {
            since: Math.floor(Math.random() * TOTALESTIMATE['allUsers'])
        }
    },

    /*
     example: object passed to targetGenerator
     'staredRepos', {
     urlAppend: {
     type: '..',
     args: [130, 230]
     },
     start_page: 10
     }
     */
    'staredRepos': {
        urlPartial: 'legacy/repos/search/stars:',
        urlAppend: function(obj) {
            //argument: type, num
            var type = obj.type;
            var args = obj.args;
            switch (type) {
                case '=':
                    this.urlPartial += args[0];
                    break;
                case '>':
                    this.urlPartial += ('>' + args[0]);
                    break;
                case '<':
                    this.urlPartial += ('<' + args[0]);
                    break;
                case '..':
                    this.urlPartial += (args[0] + '..' + args[1]);
                    break;
            }
        },
        qs: {
            per_page: 100
        }
    },
    'followedUsers': {
        urlPartial: 'legacy/users/search/follows:',
        urlAppend: function(obj) {
            //argument: type, num
            var type = obj.type;
            var args = obj.args;
            switch (type) {
                case '=':
                    this.urlPartial += args[0];
                    break;
                case '>':
                    this.urlPartial += ('>' + args[0]);
                    break;
                case '<':
                    this.urlPartial += ('<' + args[0]);
                    break;
                case '..':
                    this.urlPartial += (args[0] + '..' + args[1]);
                    break;
            }
        },
        qs: {
            per_page: 100
        }
    }
};

module.exports = recipes;