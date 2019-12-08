/**
 * Что выведет instanceof?
важность: 5

В коде ниже создаётся простейшая иерархия классов: Animal -> Rabbit.

Что выведет instanceof?

Распознает ли он rabbit как Animal, Rabbit и к тому же Object?

function Animal() {}

function Rabbit() {}
Rabbit.prototype = Object.create(Animal.prototype);

var rabbit = new Rabbit();

alert( rabbit instanceof Rabbit );
alert( rabbit instanceof Animal );
alert( rabbit instanceof Object );
 */

function Animal() {}

function Rabbit() {}
Rabbit.prototype = Object.create(Animal.prototype);

var rabbit = new Rabbit();

console.log( rabbit instanceof Rabbit );  // true
console.log( rabbit instanceof Animal );  // true
console.log( rabbit instanceof Object );  // true