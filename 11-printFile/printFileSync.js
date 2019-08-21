const fs = require('fs');
try{
	let fileContents = fs.readFileSync('./sample1.txt', { encoding : 'utf8'});
	console.log(fileContents);
	console.log('Thats all folks!');
} catch (err){
	console.log('something went wrong', err);
}