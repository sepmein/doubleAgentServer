var fs = require('fs');
var async = require('async');

for (var i = 1000; i > 0; i--) {
    // console.log(i);
    var taskList = [

        function (callback) {
            callback(null, 0);
        }];
    var memoryUsage = [];
    for (var y = i; y > 0; y--) {
        // console.log(y);

        taskList.push(function (arg, callback) {
            var added = arg + 1;
            //console.log('called ' + added);
            callback(null, added);
        });
        memoryUsage.push(process.memoryUsage().rss);
    }
    //console.log(taskList.length);
    console.log(memoryUsage[memoryUsage.length - 1]);
    async.waterfall(taskList, function (err, callback) {
        if (err) {
            console.log(err);
        } else {
//            console.dir(memoryUsage.length);
            //				fs.writeFile(__dirname + '/data/' + n + '.json', '[' + memoryUsage.toString() + ']', function(err) {
            //					if (err) throw err;
            //console.log('It\'s saved!');
        }
    });
}
