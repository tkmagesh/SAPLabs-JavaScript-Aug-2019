var Employee = /** @class */ (function () {
    function Employee(id, name) {
        this.id = 0;
        this.name = '';
        this.id = id;
        this.name = name;
    }
    Employee.prototype.display = function () {
        console.log("id = " + this.id + ", name = " + this.name);
    };
    return Employee;
}());
var e = new Employee(100, 'Magesh');
console.log(e.id);
e.display();
