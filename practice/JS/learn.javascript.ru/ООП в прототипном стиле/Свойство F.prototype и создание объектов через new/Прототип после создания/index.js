/**
 * Прототип после создания
важность: 5

В примерах ниже создаётся объект new Rabbit, а затем проводятся различные действия с prototype.

Каковы будут результаты выполнения? Почему?

Начнём с этого кода. Что он выведет?

function Rabbit() {}
Rabbit.prototype = {
  eats: true
};

var rabbit = new Rabbit();

alert( rabbit.eats );

Добавили строку (выделена), что будет теперь?

function Rabbit() {}
Rabbit.prototype = {
  eats: true
};

var rabbit = new Rabbit();

Rabbit.prototype = {};

alert( rabbit.eats );

А если код будет такой? (заменена одна строка):

function Rabbit(name) {}
Rabbit.prototype = {
  eats: true
};

var rabbit = new Rabbit();

Rabbit.prototype.eats = false;

alert( rabbit.eats );

А такой? (заменена одна строка)

function Rabbit(name) {}
Rabbit.prototype = {
  eats: true
};

var rabbit = new Rabbit();

delete rabbit.eats; // (*)

alert( rabbit.eats );

И последний вариант:

function Rabbit(name) {}
Rabbit.prototype = {
  eats: true
};

var rabbit = new Rabbit();

delete Rabbit.prototype.eats; // (*)

alert( rabbit.eats );
 */

// Каковы будут результаты выполнения? Почему?

// Начнём с этого кода. Что он выведет?

// function Rabbit() {}
// Rabbit.prototype = {
  // eats: true
// };
//
// var rabbit = new Rabbit();

console.log( rabbit.eats ); // true, т.к. прототип Rabbit присвавает значение объекта.

// Добавили строку (выделена), что будет теперь?

// function Rabbit() {}
// Rabbit.prototype = {
//   eats: true
// };

// var rabbit = new Rabbit();

// Rabbit.prototype = {}; // !!!

console.log( rabbit.eats ); // true, prototype задает только у новых

// А если код будет такой? (заменена одна строка):

// function Rabbit(name) {}
// Rabbit.prototype = {
//   eats: true
// };

// var rabbit = new Rabbit();

// Rabbit.prototype.eats = false; // !!!

console.log( rabbit.eats ); // false 

// А такой? (заменена одна строка) 

// function Rabbit(name) {}
// Rabbit.prototype = {
//   eats: true
// };

// var rabbit = new Rabbit();

// delete rabbit.eats; // (*)

console.log( rabbit.eats ); // true, удаление не с прототипа.

// И последний вариант:

// function Rabbit(name) {}
// Rabbit.prototype = {
//   eats: true
// };

// var rabbit = new Rabbit();

// delete Rabbit.prototype.eats; // (*)

console.log( rabbit.eats ); // undefined, удален eats delete
