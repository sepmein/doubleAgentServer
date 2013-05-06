var request = require('request');
var async = require('async');
var githubToken = require('.././config').githubToken;

var Crawler = Object.create(null);

Crawler.makeRequest = function makeRequest(arg, callback) {
    console.log('Crawler.makeRequest called~ the arg is ' + arg);
    console.log('and the callback ' + ((typeof callback === 'function')?'is':'is not') + 'a function');
    var option = (function(argument) {
        var querySince;
        if (argument > 0) {
            querySince = argument;
        } else {
            querySince = 0;
        }
        return {
            url: "https://api.github.com/repositories",
            qs: {
                since: argument,
                'client_id': githubToken.client_id,
                'client_secret': githubToken.client_secret
            },
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.31 (KHTML, like Gecko) Chrome/26.0.1410.64 Safari/537.31"
            }
        }
    })(arg);

    request(option, function(error, response, body) {
        var results = JSON.parse(body);
        var lastId = results[results.length - 1].id;
        //console.dir(response);
        //console.log(lastId);
        if (results.length > 0) {
            console.log(results);
            callback(error, results);
        } else {
            //todo handle the error
            console.log('no results returned');
        }

    });

};


//profiling
Crawler.getGithubRepositories = function() {

    var startingTime = new Date();
    var counter = 0;
    async.waterfall(
    [function(callback) {
        makeRequest(null, callback);
    }, function(arg, callback) {
        makeRequest(arg, callback);
    }, function(arg, callback) {
        makeRequest(arg, callback);
    }, function(arg, callback) {
        makeRequest(arg, callback);
    }, function(arg, callback) {
        makeRequest(arg, callback);
    }], function(err, result) {
        var endingTime = new Date();
        var processingTime = (endingTime - startingTime) / 1000;
        console.log('处理总共用时 : ' + processingTime + '秒');
    });
};

module.exports = Crawler;

//master worker mode
//master 分配任务
//worker 完成任务，将完成信息反馈至master处，将数据存入数据库
//worker 可扩展
//worker 无状态
var crawler = {
    master: {
        assignTask: '',
        loadBalance: '',
        createWorker: '',
        destoryWorker: ''
    },
    worker: {
        id: '',
        onAssign: '',
        onFinish: '',
        saveToDb: ''

    }
}