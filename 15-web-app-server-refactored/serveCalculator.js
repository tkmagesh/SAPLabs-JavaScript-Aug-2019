const querystring = require('querystring'),
	calculator = require('./calculator');
	
module.exports = function(req, res){
	if (req.urlObj.pathname === '/calculator'){
		if (req.method === 'GET'){
			const queryData = querystring.parse(req.urlObj.query),
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
	}
}