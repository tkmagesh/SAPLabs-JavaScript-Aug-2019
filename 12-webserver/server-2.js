const http = require('http'),
	fs = require('fs'),
	path = require('path'),
	url = require('url');

const server = http.createServer((req, res) => {

	console.log(req.method + '\t' + req.url);

	var resourceName = req.url === '/' ? '/index.html' : req.url,
		urlObj = url.parse(resourceName),
		resourceFullName = path.join(__dirname, urlObj.pathname);

	if (!fs.existsSync(resourceFullName)){
		res.statusCode = 404;
		res.end();
		return;
	}
	const stream = fs.createReadStream(resourceFullName);
	stream.pipe(res);
});

server.listen('8080');

server.on('listening', () => console.log('server listening on 8080...'));