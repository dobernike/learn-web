/**
 * Две функции - один объект
важность: 2

Возможно ли создать функции A и B в примере ниже, где объекты равны new A()==new B()?

function A() { ... }
function B() { ... }

let a = new A;
let b = new B;

alert( a == b ); // true

Если да – приведите пример вашего кода.
 */
const obj = {};

function A(a) {
  return obj;
};
function B(a) {
  return obj;
};

let a = new A();
let b = new B();

console.log(a == b); // true
