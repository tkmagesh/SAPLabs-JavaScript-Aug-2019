function Spinner(){
	var counter = 0;

	this.up = function(){
		return ++counter;
	};

	this.down = function(){
		return --counter;
	}
}

function Spinner(){
	this.counter = 0;
}
Spinner.prototype.up = function(){
	return ++this.counter;
};

Spinner.prototype.down = function(){
	return --this.counter;
}