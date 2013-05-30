var Infiniteloop = require('Infinite-loop');
var makeRequest = require('.././crawler').makeRequest;

var INCREMENT == 20;

var dosomething = function(ruler, cb) {
	var FIRSTGUESE = 1143;
	var currentGuess = FIRSTGUESE;
	var movedown = 0;
	var moveup = 0;
	//两分法算法获取需要获取的值
	if (ruler.length === 0) {
		//init
		//db.check later
		var params = {
			to: '/legacy/repos/search/' + 'stars%3A>' + firstGuese,
			qs: {
				per_page: 100,
				start_page: 10
			},
			token: 0
		};

		makeRequest(params, function(err, result, response) {

			if (err) throw err;

			if (result.length > 0 && result.length < 100) {
				//恰当，可以不用做两分法测试了,应该直接使用该值抓取数据
				//由于是首次抓取所以情况特殊，searchTerm应使用特别语句生成
				stadardPageCrawler(currentGuess, cb);
			} else if (result.length === 100) {
				//返回结果数量太多， 减少猜想值
			} else if () {
				//返回结果数量太少， 增加猜想值
				firstGuese += INCREMENT * operatedTimes;
				operatedTimes++;
			}
		});
	} else {

	}
};

var stadardPageCrawler = function(currentGuess, cb) {
	//从第一页抓取所有数据， 完成后使用cb
	//使用currentGuess生成params
	var params = {

	}
	makeRequest(params, function (err, result, response) {
		//传递目前的值， 以及数据
		cb(currentGuess, data);
	})
};


function getStaredRepositories() {

	var ruler = {
		ruler: [],
		pointer: 0
	};

	var loop = new Infiniteloop();

	function grab() {
		dosomething(ruler, function(x, data) {
			//忘了status是用来干嘛的了。。汗
			if (status === true) {
				ruler.data.push(x);
				ruler.pointer++;
				db.save(data);
			} else {
				loop.stop();
			}

		});
	}

	loop.add(grab).run();


}