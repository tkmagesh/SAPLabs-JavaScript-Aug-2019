const http = require('http'),
	fs = require('fs'),
	path = require('path'),
	url = require('url'),
	querystring = require('querystring'),
	calculator = require('./calculator');

const staticResExtns = ['.html', '.css', '.js', '.jpg', '.png', '.ico', '.txt', '.xml', '.json'];

function isStatic(resource){
	const resExtn = path.extname(resource);
	return staticResExtns.indexOf(resExtn) >= 0;
}

const server = http.createServer((req, res) => {

	console.log(req.method + '\t' + req.url);

	var resourceName = req.url === '/' ? '/index.html' : req.url,
		urlObj = url.parse(resourceName);

	if (isStatic(urlObj.pathname)){
		const resourceFullName = path.join(__dirname, urlObj.pathname);
		if (!fs.existsSync(resourceFullName)){
			res.statusCode = 404;
			res.end();
			return;
		}
		const stream = fs.createReadStream(resourceFullName);
		stream.pipe(res);
	} else if (urlObj.pathname === '/calculator'){
		if (req.method === 'GET'){
			const queryData = querystring.parse(urlObj.query),
				op = queryData.op,
				x = parseInt(queryData.x),
				y = parseInt(queryData.y),
				result = calculator[op](x,y);

			res.write(result.toString());
			res.end();
		} else {
			let rawData = '';
			req.on('data', chunk => rawData += chunk);
			req.on('end', () => {
				const bodyData = querystring.parse(rawData),
					op = bodyData.op,
					x = parseInt(bodyData.x),
					y = parseInt(bodyData.y),
					result = calculator[op](x,y);

				res.write(result.toString());
				res.end();
			});
		}
	} else {
		res.statusCode = 404;
		res.end();
	}
});

server.listen('8080');

server.on('listening', () => console.log('server listening on 8080...'));