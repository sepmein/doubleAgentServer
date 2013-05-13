/**
 * Created with JetBrains WebStorm.
 * User: spencer
 * Date: 13-5-12
 * Time: 下午1:31
 * To change this template use File | Settings | File Templates.
 */

/*testing with infinite loop*/
// for loop

var count = 1000000000000;

function forLoop() {
    for (; ;) {
        console.log(count--);
    }
}
//forLoop();

function processLoop() {
    console.log(count--);
    process.nextTick(processLoop);
}

//processLoop();
var fn = function setImmediateLoop() {
    console.log(count--);
    setImmediate(function () {
            process.nextTick(function () {
                fn()
            });
        }
    );
};
//fn();


function withoutInterval() {
    setImmediate(function () {
        console.log(count--);
        withoutInterval();
    });
}

withoutInterval();

function interval() {
    setInterval(function () {
        console.log(count--);
    }, 0)
}

//interval();