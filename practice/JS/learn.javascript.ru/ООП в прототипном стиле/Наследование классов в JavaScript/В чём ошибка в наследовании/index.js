/**
 * В чём ошибка в наследовании
важность: 5

Найдите ошибку в прототипном наследовании. К чему она приведёт?
 */
function Animal(name) {
  this.name = name;

  this.walk = function() {  //  методы должны идти отдельно
    console.log( "ходит " + this.name );
  };

}

function Rabbit(name) {
  Animal.apply(this, arguments);
}
Rabbit.prototype = Object.create(Animal.prototype);

Rabbit.prototype.walk = function() {
  console.log( "прыгает " + this.name );
};

var rabbit = new Rabbit("Кроль");
rabbit.walk();
