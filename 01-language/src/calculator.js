/*
function add(x,y){
	function parseArg(n){
		if (Array.isArray(n)) return add.apply(undefined ,n);
		if (typeof n === 'function') return parseArg(n());
		return isNaN(n) ? 0 : parseInt(n,10);
	}
	return arguments.length <= 1 ? parseArg(arguments[0]) : parseArg(arguments[0]) + add([].slice.call(arguments,1));
}
*/

function add(...args){
	function parseArg(n){
		if (Array.isArray(n)) return add(...n);
		if (typeof n === 'function') return parseArg(n());
		return isNaN(n) ? 0 : parseInt(n,10);
	}
	return args.length <= 1 ? parseArg(args[0]) : parseArg(args[0]) + add(args.slice(1));
}
/*
As a method of an object
	this -> object

As a function
	this -> global (window)


*/