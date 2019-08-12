/*
Чему равно свойство после delete?
важность: 5

Какие значения будут выводиться в коде ниже?

var animal = {
  jumps: null
};
var rabbit = {
  jumps: true
};

rabbit.__proto__ = animal;

alert( rabbit.jumps ); // ? (1)

delete rabbit.jumps;

alert( rabbit.jumps ); // ? (2)

delete animal.jumps;

alert( rabbit.jumps ); // ? (3)

Итого три вопроса.
 */

var animal = {
  jumps: null
};
var rabbit = {
  jumps: true
};

rabbit.__proto__ = animal;

console.log( rabbit.jumps ); // true (1)

delete rabbit.jumps;

console.log( rabbit.jumps ); // null (2)

delete animal.jumps;

console.log( rabbit.jumps ); // undefined (3)