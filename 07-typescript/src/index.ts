class Employee{
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
e.display();
