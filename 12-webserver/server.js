const http = require('http');

const server = http.createServer((req, res) => {
/*
	req -> IncomingMessage (ReadableStream)
	res -> ServerResponse (WritableStream)
*/
	console.log(req.url);
	res.write('<h1>Welcome to Node.js</h1>');
	res.end();
});

server.listen('8080');

server.on('listening', () => console.log('server listening on 8080...'));