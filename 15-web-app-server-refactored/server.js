const http = require('http');

const dataParser = require('./dataParser'),
	serveStatic = require('./serveStatic'),
	serveCalculator = require('./serveCalculator'),
	notFoundHandler = require('./notFoundHandler');

const server = http.createServer((req, res) => {
	console.log(req.method + '\t' + req.url);
	dataParser(req);	
	serveStatic(req, res);
	serveCalculator(req, res);
	notFoundHandler(res);
});

server.listen('8080');

server.on('listening', () => console.log('server listening on 8080...'));