/**
 * Задачи
Промисифицировать setTimeout

Напишите функцию delay(ms), которая возвращает промис, переходящий в состояние "resolved" через ms миллисекунд.
 */

const delay = function(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, this.ms);
  });
};

// Пример использования:

delay(1000).then(() => console.log("Hello!"));

// Такая функция полезна для использования в других промис-цепочках.

// Вот такой вызов:

// return new Promise((resolve, reject) => {
  // setTimeout(() => {
    // doSomeThing();
    // resolve();
  // }, ms);
// });

// Станет возможным переписать так:

// return delay(ms).then(doSomething);
