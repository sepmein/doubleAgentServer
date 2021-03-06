/*
 * 算了也没啥人能看得懂
 * 要重构啊！重构啊！亲！！！！！！
 * */

var InfiniteLoop = require('Infinite-loop'),
    bisection = require('.././util').bisection,
    github = require('.././github'),
    async = require('async');

var getSeperator = function getSeperatorF(callback) {
    var BIGGEST_STARS_REPOS_NUM_BIGGER_THAN_1000 = 33,
        biggestStarReposNumPointer = BIGGEST_STARS_REPOS_NUM_BIGGER_THAN_1000,
        doubleChecked = false;

    if (!doubleChecked) {

        //获取star数大于1000的最大值
        checkEqualsTo(biggestStarReposNumPointer, function (err, result) {

            //符合要求，返回的结果数在900~1000之间
            if (result === 0) {

                //double check next
                biggestStarReposNumPointer++;
                doubleChecked = true;
            }

            //数量大于1000
            else if (result === 1) {
                biggestStarReposNumPointer++;
            }

            //数量小于900
            else if (result === -1) {
                biggestStarReposNumPointer--;
            }
            getSeperatorF(callback);
        });
    } else {
        callback(biggestStarReposNumPointer);
    }
};

var doSomething = function (ruler, cb) {

    var FIRST_GUESS = 1143,

    //todo modify it, make it active
        FIRST_GAP = 100,
        INCREMENT = 20,
        currentGuess = FIRST_GUESS,
        downTimes = 0,
        closestDown,
        upTimes = 0,
        closestUp,
        lastOperation = {
            operation: null,
            opTimes  : 0
        },
        rulerLength = ruler.length,
        lastRuler = ruler[ruler.length - 1];

    //两分法算法获取需要获取的值
    if (ruler.length === 0) {

        //init
        //db.check ruler.length later
        (function firstOperation() {
            github.search.staredRepos.checkLength({
                urlAppend: {
                    type: '>',
                    args: [currentGuess]
                }
            }, function (err, result) {
                if (err) throw err;
                if (downTimes * upTimes > 0) {

                    //如果预测值的上下数据都有了
                    //现在才是两分法啊！！！尼玛，算法太复杂了
                    bisection(
                        {big: closestUp, small: closestDown}
                        , checkBiggerThan
                        , function (result) {

                            //craw the result
                            crawlStaredRepos(result);

                            //deliver the result
                            cb(result);
                        });
                } else {
                    switch (result) {
                        case 0:

                            //恰当，可以不用做两分法测试了,应该直接使用该值抓取数据
                            //由于是首次抓取所以情况特殊，searchTerm应使用特别语句生成
                            crawlStaredRepos(currentGuess);
                            cb(currentGuess);
                            break;
                        case 1:

                            //返回结果数量太多， 减少猜想值
                            //继续
                            if (lastOperation.operation === 'down') {
                                lastOperation.opTimes++;
                                currentGuess -= INCREMENT * lastOperation.opTimes;
                            } else {

                                //rest opTimes
                                lastOperation.opTimes = 0;
                                currentGuess -= INCREMENT;
                            }
                            lastOperation.operation = 'down';

                            //zai shang mian de ci shu
                            upTimes++;
                            closestUp = currentGuess;
                            firstOperation();
                            break;
                        case -1:

                            //返回结果数量太少， 增加猜想值
                            //go on
                            if (lastOperation.operation === 'up') {
                                lastOperation.opTimes++;
                                currentGuess += INCREMENT * lastOperation.opTimes;
                            } else {

                                //rest opTimes
                                lastOperation.opTimes = 0;
                                currentGuess += INCREMENT;
                            }
                            lastOperation.operation = 'up';
                            downTimes++;
                            closestDown = currentGuess;
                            firstOperation();
                            break;
                    }
                }
            });
        })();
    } else {
        (function nextStep() {

            //first Operation has been done
            //use the latest info in the array
            var gap = (rulerLength > 1) ? (lastRuler - ruler[rulerLength - 2]) : FIRST_GAP;

            //guess the current gap using the latest gap
            var guess = lastRuler - gap / 0.9;
            github.search.staredRepos.checkLength({
                type: '..',
                args: [guess, lastRuler]
            }, function (err, result) {
                if (err) throw err;
                if (downTimes * upTimes > 0) {
                    bisection(
                        {big: closestUp, small: closestDown, upperLimit: lastRuler}
                        , checkBetween
                        , function (result) {

                            //craw the result
                            crawlStaredRepos(result);

                            //deliver the result
                            cb(result);
                        });
                } else {
                    switch (result) {
                        case 0:

                            //恰当，可以不用做两分法测试了,应该直接使用该值抓取数据
                            //由于是首次抓取所以情况特殊，searchTerm应使用特别语句生成
                            crawlStaredRepos(currentGuess);
                            cb(currentGuess);
                            break;
                        case 1:

                            //返回结果数量太多， 减少猜想值
                            //继续
                            if (lastOperation.operation === 'down') {
                                lastOperation.opTimes++;
                                currentGuess -= INCREMENT * lastOperation.opTimes;
                            } else {

                                //rest opTimes
                                lastOperation.opTimes = 0;
                                currentGuess -= INCREMENT;
                            }
                            lastOperation.operation = 'down';

                            //在上面的次数
                            upTimes++;
                            closestUp = currentGuess;
                            nextStep();
                            break;
                        case -1:

                            //返回结果数量太少， 增加猜想值
                            //go on
                            if (lastOperation.operation === 'up') {
                                lastOperation.opTimes++;
                                currentGuess += INCREMENT * lastOperation.opTimes;
                            } else {

                                //rest opTimes
                                lastOperation.opTimes = 0;
                                currentGuess += INCREMENT;
                            }
                            lastOperation.operation = 'up';
                            downTimes++;
                            closestDown = currentGuess;
                            nextStep();
                            break;
                    }
                }
            });
        })();
    }
};

var checkBiggerThan = function (m, callback) {

    //根据middle值，生成request参数
    var params = {
        urlAppend: {
            type: '>',
            args: [m]
        }
    };
    github.search.staredRepos.checkLength(params, function (err, result) {
        callback(err, result);
    });
};

var checkLesserThan = function (m, callback) {

    //根据middle值，生成request参数
    var params = {
        urlAppend: {
            type: '<',
            args: [m]
        }
    };
    github.search.staredRepos.checkLength(params, function (err, result) {
        callback(err, result);
    });
};

var checkEqualsTo = function (m, callback) {

    //根据middle值，生成request参数
    var params = {
        urlAppend: {
            type: '=',
            args: [m]
        }
    };
    github.search.staredRepos.checkLength(params, function (err, result) {
        callback(err, result);
    });
};

var checkBetween = function (m, ul, callback) {
    var params = {
        urlAppend: {
            type: '..',
            args: [m, ul]
        }
    };
    github.search.staredRepos.checkLength(params, function (err, result) {
        callback(err, result);
    });
};

var crawlStaredRepos = function () {

};

function getStaredRepositories() {

    var ruler = {
        ruler  : [],
        pointer: 0
    };

    var loop = new InfiniteLoop();

    function grab() {
        doSomething(ruler, function (x) {

            //忘了status是用来干嘛的了。。汗
            if (status === true) {
                ruler.data.push(x);
                ruler.pointer++;
            } else {
                loop.stop();
            }

        });
    }

    loop.add(grab).run();

}

async.waterfall([function (callback) {
    getSeperator(callback);
}, function (seperator, callback) {

}
], function (seperator, callback) {

});

