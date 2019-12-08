/**
 * Проверка на пустоту
важность: 5

Напишите функцию isEmpty(obj), которая возвращает true, если у объекта нет свойств, иначе false.

Должно работать так:

let schedule = {};

alert( isEmpty(schedule) ); // true

schedule["8:30"] = "get up";

alert( isEmpty(schedule) ); // false
 */


function isEmpty(obj) {
  for (const prop in obj) return false;
  return true
}
