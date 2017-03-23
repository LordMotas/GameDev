'use strict';

var http = require('http'),
	path = require('path'),
	fs = require('fs');

var mimeTypes = {
	'.js' : 'text/javascript',
	'.html' : 'text/html',
	'.css' : 'text/css'
};

//A simple HTTP server to handle the game
function handleRequest(req, res){
	var lookup = (req.url === '/') ? '/index.html' : decodeURI(req.url),
		file = lookup.substring(1, lookup.length);

	console.log('request: ' + req.url);
	fs.exists(file, function(exists) {
		if(exists){
			console.log('Trying to send: ' + lookup);
			fs.readFile(file, function(err, data) {
				var headers = { 'Content-type': mimeTypes[path.extname(lookup)] };

				if(err){
					res.writeHead(500);
					res.end('Server Error!');
				}else{
					res.writeHead(200, headers);
					res.end(data);
				}
			});
		}else{
			console.log('Failed to find/send: ' + lookup);
			res.writeHead(404);
			res.end();
		}
	});
}

http.createServer(handleRequest).listen(3000, function(){
	console.log('Server is listening on port 3000');
});
