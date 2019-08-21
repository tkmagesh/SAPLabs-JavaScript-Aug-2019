const fs = require('fs');

const stream = fs.createReadStream('./sample.txt', { encoding : 'utf8'});

//Readable Stream events -> open, data, end, close, error

let readCount = 0;

stream.on('data', function(chunk){
	++readCount;
	//console.log(chunk);
});

stream.on('end', function(){
	console.log('Thats all folks');
	console.log(`completed with ${readCount} reads`);
});

stream.on('error', function(){
	console.log('something went wrong!');
});

stream.pipe(process.stdout);
