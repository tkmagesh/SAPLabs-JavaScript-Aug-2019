const fs = require('fs'),
	path = require('path');

const staticResExtns = ['.html', '.css', '.js', '.jpg', '.png', '.ico', '.txt', '.xml', '.json'];

function isStatic(resource){
	const resExtn = path.extname(resource);
	return staticResExtns.indexOf(resExtn) >= 0;
}

module.exports = function(staticResPath){
	return function(req, res, next){
		if (isStatic(req.urlObj.pathname)){
			const resourceFullName = path.join(staticResPath, req.urlObj.pathname);
			if (!fs.existsSync(resourceFullName)){
				res.statusCode = 404;
				res.end();
				return;
			}
			const stream = fs.createReadStream(resourceFullName);
			stream.pipe(res);
			stream.on('end', () => next());
		} else {
			next();
		}
	}
};