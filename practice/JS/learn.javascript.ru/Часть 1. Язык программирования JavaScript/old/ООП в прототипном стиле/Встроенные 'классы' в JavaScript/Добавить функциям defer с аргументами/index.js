/**
 * Добавить функциям defer с аргументами
важность: 4

Добавьте всем функциям в прототип метод defer(ms), который возвращает обёртку, откладывающую вызов функции на ms миллисекунд.

Например, должно работать так:

function f(a, b) {
  alert( a + b );
}

f.defer(1000)(1, 2); // выведет 3 через 1 секунду.

То есть, должны корректно передаваться аргументы.
 */

Function.prototype.defer = function (ms) {
  const func = this;
  return function () {
    setTimeout(() => func.apply(this, arguments), ms);
  }
}


function f(a, b) {
  console.log(a + b);
}

f.defer(1000)(1, 2); // выведет 3 через 1 секунду.
