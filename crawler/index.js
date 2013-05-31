var request = require('request');
var async = require('async');
var targetGenerator = require('./targetGenerator');

var crawler = Object.create(null);
/*
    target api example:
    {
        recipeName: 'staredRepos',
        args: {
            
        }
    }
*/
crawler.makeRequest = function makeRequest(target, callback) {
    // console.log('crawler.makeRequest called~ the arg is ' + arg);
    // console.log('and the callback ' + ((typeof callback === 'function')?'is':'is not') + ' a function');
    request(target, function (error, response, body) {
        if (typeof body === 'string' && body[0] === '[') {
            try {
                var results = JSON.parse(body);
            }
            catch (e) {
                //todo handle the error
                console.log(e.message);
            }
        }
        //var lastId = results[results.length - 1].id;
        //console.dir(response.headers);
        //console.log(lastId);
        if (Array.isArray(results) && results.length > 0) {
            //console.log(results);
            callback(error, results, response);
        } else {
            //todo handle the error
            //console.log(response);
            //console.log(error);
            //console.dir(response.headers);
            //console.dir(results);
            callback(new Error('no result'), [], response);
        }

    });

};

module.exports = crawler;

//master worker mode
//master 分配任务
//worker 完成任务，将完成信息反馈至master处，将数据存入数据库
//worker 可扩展
//worker 无状态
// var crawler = {
// master: {
// assignTask: '',
// loadBalance: '',
// createWorker: '',
// destoryWorker: ''
// },
// worker: {
// id: '',
// onAssign: '',
// onFinish: '',
// saveToDb: ''
// }
// }