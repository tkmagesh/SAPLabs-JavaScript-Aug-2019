const http = require('http'),
	path = require('path');

const dataParser = require('./dataParser'),
	serveStatic = require('./serveStatic'),
	serveCalculator = require('./serveCalculator'),
	notFoundHandler = require('./notFoundHandler'),
	logger = require('./logger');
	app = require('./app');

app.use(dataParser);
app.use(logger);
app.use(serveStatic(path.join(__dirname, 'public'))); 
app.use(serveCalculator);
app.use(notFoundHandler);



const server = http.createServer(app);

server.listen('8080');

server.on('listening', () => console.log('server listening on 8080...'));