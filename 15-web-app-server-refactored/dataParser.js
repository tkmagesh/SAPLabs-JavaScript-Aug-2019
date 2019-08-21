const url = require('url'),
	querystring = require('querystring');

module.exports = function(req, res, next){
	const resourceName = req.url === '/' ? '/index.html' : req.url;
	req['urlObj'] = url.parse(resourceName);
	req['queryData'] = querystring.parse(req.urlObj.query);
	let rawData = '';
	req.on('data', chunk => rawData += chunk);
	req.on('end', () => {
		req['bodyData'] = querystring.parse(rawData);
		next();
	});
}