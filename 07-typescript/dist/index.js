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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/*import * as xyz from './math';

//var add = mathObj.add;

var { add } = mathObj;*/
/*import { add } from './math'

import math from './math';


console.log(add(10,20));*/
function log(start, end) {
    if (start === void 0) { start = 'invocation started'; }
    if (end === void 0) { end = 'invocation completed'; }
    return function f(target, propertyKey, descriptor) {
        var oldValue = descriptor.value;
        descriptor.value = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            console.log(start);
            oldValue.apply(target, args);
            console.log(end);
        };
    };
}
var MyClass = /** @class */ (function () {
    function MyClass() {
    }
    MyClass.prototype.m1 = function () {
        console.log('m1 is invoked');
    };
    __decorate([
        log()
    ], MyClass.prototype, "m1", null);
    return MyClass;
}());
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
function Role() {
    var roleNames = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        roleNames[_i] = arguments[_i];
    }
    return function (target, propertyKey, descriptor) {
        var oldDesc = descriptor.value;
        descriptor.value = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            console.log(roleNames, this.userRole);
            if (roleNames.indexOf(this.userRole) === -1) {
                throw new Error('Not authorized');
            }
            return oldDesc.apply(void 0, args);
        };
    };
}
function newLog(target, propertyKey, descriptor) {
    descriptor.value = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        console.log(args);
        return descriptor.value.apply(descriptor, args);
    };
}
var Calculator = /** @class */ (function () {
    function Calculator(userRole) {
        this._userRole = '';
        this._userRole = userRole;
    }
    Object.defineProperty(Calculator.prototype, "userRole", {
        get: function () {
            return this._userRole;
        },
        enumerable: true,
        configurable: true
    });
    Calculator.prototype.add = function (x, y) {
        return x + y;
    };
    //@newLog
    Calculator.prototype.subtract = function (x, y) {
        return x - y;
    };
    __decorate([
        Role('Admin')
    ], Calculator.prototype, "add", null);
    __decorate([
        Role('Admin', 'User')
    ], Calculator.prototype, "subtract", null);
    return Calculator;
}());
var calc = new Calculator('Admin');
console.log(calc.subtract(10, 20));
//console.log(calc.add(10,20));
//# sourceMappingURL=index.js.map