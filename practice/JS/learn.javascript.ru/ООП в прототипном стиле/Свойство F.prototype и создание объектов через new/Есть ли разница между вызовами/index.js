
//  Есть ли разница между вызовами?
// важность: 5

// Создадим новый объект, вот такой:

function Rabbit(name) {
  this.name = name;
}
Rabbit.prototype.sayHi = function () {
  console.log(this.name);
};

var rabbit = new Rabbit("Rabbit");

// Одинаково ли сработают эти вызовы?

rabbit.sayHi(); // Rabbit | cross
Rabbit.prototype.sayHi(); // undef | cross
Object.getPrototypeOf(rabbit).sayHi(); // undef | IE8-
rabbit.__proto__.sayHi(); // undef | IE10-
//this – объект перед точкой". !!!

// Все ли они являются кросс-браузерными? Если нет – в каких браузерах сработает каждый?
