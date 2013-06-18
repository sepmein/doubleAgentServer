/**
 * kokiya 功能包，为其他模块提供快捷程序
 * @module util
 */
var util = util || {};

/**
 * 验证邮件地址，使用正则表达式
 * @method validateEmail
 * @param {String} email Email地址
 * @return {Boolean} 成功返回1，否则返回0
 */
util.validateEmail = function (email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

/**
 * 生成随机字符串
 * @method generateRandom
 * @param {Number} length 生成
 * @return {String} 长度为length、包含数字及大小写、随机排列的字符串
 */
util.generateRandom = function (length) {
    var s = "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var result = "";
    for (var i = length || 6; i > 0; i--) {
        result += s.charAt(Math.floor(Math.random() * s.length));
    }
    return result;
};

util.extend = function (o, p) {
    for (var prop in p) {
        o[prop] = p[prop];
    }
    return o;
};

//todo make changes to fit my own use case
util.callFn = function () {
    switch (arguments.length) {

        // fast cases
        case 1:
            handler.call(this);
            break;
        case 2:
            handler.call(this, arguments[1]);
            break;
        case 3:
            handler.call(this, arguments[1], arguments[2]);
            break;

        // slower
        default:
            var len = arguments.length,
                args = new Array(len - 1),
                i;
            for (i = 1; i < len; i++)
                args[i - 1] = arguments[i];
            handler.apply(this, args);
    }
};

/*
 * async version of bisection
 * args:
 *  big, small: the upper and lower number of the expected section
 *  upperLimit: the upper limit of the interval
 *  check: function which accept two args
 *      the first is the middle number compares to the result
 *      the second is a callback, which will be executed when the compares finished
 *  a callback should return an error first, and a status code of the compare result second
 *      status code: -1, 0 ,1 represents: smaller, equals, bigger
 *      handleResultFn: function
 *      when the status code equals 0, do sth. to the result
 * */

 util.bisection = function bisection(args, checkFn, handleResultFn) {
    var big = args.big,
        small = args.small,
        upperLimit = args.upperLimit,
        m = Math.floor((big - small) / 2) + small;
    var next = function (error, result) {
        if (error) {
            console.log(error);
        } else {
            if (result === 0) {
                handleResultFn(m);
            } else if (result === -1) {
                args.big = m;
                bisection(args, checkFn, handleResultFn);
            } else if (result === 1) {
                args.small = m;
                bisection(args, checkFn, handleResultFn);
            }
        }
    }
    if (upperLimit == undefined) {
        checkFn(m, next);
    } else {
        checkFn(m, upperLimit, next);
    }
};

module.exports = util;