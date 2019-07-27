/**
 * Странное поведение instanceof
важность: 5

Почему instanceof в коде ниже возвращает true, ведь объект a явно создан не B()?

function A() {}

function B() {}

A.prototype = B.prototype = {};

var a = new A();

alert( a instanceof B ); // true
 */

function A() {}

function B() {}

A.prototype = B.prototype = {};

var a = new A();

console.log( a instanceof B ); // true
// prototype;