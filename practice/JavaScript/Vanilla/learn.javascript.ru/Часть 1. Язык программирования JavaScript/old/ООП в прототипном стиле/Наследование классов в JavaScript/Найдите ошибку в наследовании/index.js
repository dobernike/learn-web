/**
 * Найдите ошибку в наследовании
важность: 5

Найдите ошибку в прототипном наследовании. К чему она приведёт?
 */
function Animal(name) {
  this.name = name;
}

Animal.prototype.walk = function() {
  console.log( "ходит " + this.name );
};

function Rabbit(name) {
  this.name = name;
}
Rabbit.prototype = Animal.prototype; // Rabbir.prototype = object.Create(Animal.prototype);

Rabbit.prototype.walk = function() {
  console.log( "прыгает! и ходит: " + this.name );
};

var animal = new Animal("Хрюшка");
animal.walk(); // прыгает! и ходит Хрюшка