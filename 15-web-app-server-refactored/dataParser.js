const url = require('url');

module.exports = function(req){
	const resourceName = req.url === '/' ? '/index.html' : req.url;
	req['urlObj'] = url.parse(resourceName);
}