const http = require('http'),
	url = require('url'),
	querystring = require('querystring'),
	calculator = require('./calculator');

const server = http.createServer((req, res) => {
	const urlObj = url.parse(req.url);
	if (urlObj.pathname !== '/calculator'){
		res.statusCode = 404;
		res.end();
		return;
	}
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
});

server.listen(8085);
server.on('listening', () => console.log('app server running on 8085'));

