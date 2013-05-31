/*
 算了也没啥人能看得懂
 要重构啊！重构啊！亲！！！！！！
 */

var Infiniteloop = require('Infinite-loop');
var makeRequest = require('.././crawler').makeRequest;
var bisection = require('.././util').bisection;
var targetGenerator = require('./targetGenerator');

var dosomething = function (ruler, cb) {

    var FIRSTGUESE = 1143,
        INCREMENT = 20,
        currentGuess = FIRSTGUESE,
        downTimes = 0,
        closestDown,
        upTimes = 0,
        closestUp,
        lastOperation = {
            operation: null,
            optimes: 0
        };

    //两分法算法获取需要获取的值
    if (ruler.length === 0) {
        //init
        //db.check later
        function firstOperation() {
            var options = targetGenerator('startedRepos',{
                urlAppend: {
                    type: '>',
                    args: [currentGuess]
                },
                queryString: {
                    start_page: 10;
                }
            });

            makeRequest(options, function (err, result, response) {

                if (err) throw err;

                if (result.length > 0 && result.length < 100) {
                    //恰当，可以不用做两分法测试了,应该直接使用该值抓取数据
                    //由于是首次抓取所以情况特殊，searchTerm应使用特别语句生成
                    stadardPageCrawler(currentGuess);
                    cb(currentGuess);
                } else {
                    if (downTimes * upTimes > 0) {
                        //如果预测值的上下数据都有了
                        //现在才是两分法啊！！！尼玛，算法太复杂了
                        bisection(closestUp, closestDown, bisectionJudgement, function (result) {
                            stadardPageCrawler(result);
                            cb(result);
                        });

                    }
                    if (result.length === 100) {
                        //返回结果数量太多， 减少猜想值
                        //继续
                        if(lastOperation.operation === 'down') {
                            lastOperation.optimes ++;
                            currentGuess -= INCREMENT*lastOperation.optimes; 
                        } else {
                            //rest optimes
                            lastOperation.optimes = 0;
                            currentGuess -= INCREMENT;
                        }
                        lastOperation.operation = 'down';
                        upTimes++;
                        closestUp = currentGuess;
                        firstOperation();
                        
                    } else if (result.length < 0) {
                        //返回结果数量太少， 增加猜想值
                        closestDown = currentGuess;
                        currentGuess += INCREMENT;
                        downTimes++;
                        firstOperation();
                    }
                }
            });
        }
    } else {

    }
};

var bisectionJudgement = function (m, callback) {
    //根据middle值，生成request参数
    var params = {


    };

    //其实所有request的区别都是生成params不同，以及callback算法不同
    makeRequest(params, function (err, result, response) {
        if (result.length === 100) {
            callback(null, 1);
        } else if (result.length === 0) {
            callback(null, -1);
        } else if (result.length > 0 && result.length < 100) {
            callback(null, 0)
        }
    })
};


var stadardPageCrawler = function (currentGuess) {

    //使用对象判断，减少if else迭代
    var recipe = {
        repos: repoInvokeFn,
        users: userInvokeFn
    };


    //从第一页抓取所有数据， 完成后使用cb
    //使用currentGuess生成params
    var params = {

    };
    makeRequest(params, function (err, result, response) {
        //save to db
        db.save();
    });
};


function getStaredRepositories() {

    var ruler = {
        ruler: [],
        pointer: 0
    };

    var loop = new Infiniteloop();

    function grab() {
        dosomething(ruler, function (x) {
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