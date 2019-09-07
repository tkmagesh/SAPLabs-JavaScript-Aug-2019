/*class Employee{
	private id : number = 0;
	public name : string = '';

	constructor(id : number, name : string){
		this.id = id;
		this.name = name;
	}

	private display(){
		console.log(`id = ${this.id}, name = ${this.name}`);
	}
}

const e = new Employee(100, 'Magesh');
console.log(e.id);
e.display();*/

/*import * as xyz from './math';

//var add = mathObj.add;

var { add } = mathObj;*/

/*import { add } from './math'

import math from './math';


console.log(add(10,20));*/

function log(start='invocation started', end='invocation completed'){
	return function f(target, propertyKey: string, descriptor: PropertyDescriptor) : any {
		let oldValue = descriptor.value;
		descriptor.value = function(...args){
			console.log(start);
			oldValue.apply(target, args);
			console.log(end);
		}
	}
}



class MyClass{
	@log()
	m1(){
		console.log('m1 is invoked');
	}
}

/*let userRole = 'Admin'

function Role(...roleNames){
	return function(target, propertyKey : string, descriptor : PropertyDescriptor) : any {
		if (roleNames.indexOf(userRole) === -1){
			throw new Error('Not allowed');
		} else {
			let oldDesc = descriptor.value;
			descriptor.value = function(...args){
				console.log(this);
				return oldDesc(...args);
			};
		}
	}
}*/

function Role(...roleNames){
	return function(target, propertyKey : string, descriptor : PropertyDescriptor) : any {
		let oldDesc = descriptor.value;
		descriptor.value = function(...args){
			console.log(roleNames, this.userRole);

			if (roleNames.indexOf(this.userRole) === -1){
				throw new Error('Not authorized');
			}
			return oldDesc(...args);
		}
	}
}

function newLog(target, propertyKey : string, descriptor : PropertyDescriptor) : any {
	descriptor.value = function(...args){
		console.log(args);
		return descriptor.value(...args);
	}
}



class Calculator{

	_userRole = '';

	constructor(userRole){
		this._userRole = userRole;
	}

	get userRole(){
		return this._userRole;
	}

	@Role('Admin')
	add(x,y){
		return x + y;
	}

	//@newLog
	@Role('Admin', 'User')
	subtract(x,y){
		return x - y;
	}
}


var calc = new Calculator('Admin');
console.log(calc.subtract(10,20));

//console.log(calc.add(10,20));

