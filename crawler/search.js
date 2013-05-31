var Infiniteloop = require('Infinite-loop');
var makeRequest = require('.././crawler');

var INCREMENT == 20;

var dosomething = function(ruler, cb) {
	var firstGuese = 1143;
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

			if (!err) {
				//no result
				if (result.length === 0) {
					firstGuese += INCREMENT * operatedTimes;
					operatedTimes++;
				}
			} else {

			}
		});
	}
};

function getStaredRepositories() {

	var ruler = {
		ruler: [],
		pointer: 0
	};

	var loop = new Infiniteloop();

	function grab() {
		dosomething(ruler, function(status, x, data) {
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