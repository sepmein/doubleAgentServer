var http = require('http');

http.createServer(function(req, res){
	res.end('hello world');
}).listen(8000);


//what is it?
//api based
//when a http request come from somewhere the server got do something or don't do something