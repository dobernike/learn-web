/**
 * Случайное целое число от min до max
важность: 2

Напишите функцию randomInteger(min, max), которая генерирует случайное целое (integer) число от min до max (включительно).

Любое число из интервала min..max должно появляться с одинаковой вероятностью.

Пример работы функции:

alert( randomInteger(1, 5) ); // 1
alert( randomInteger(1, 5) ); // 3
alert( randomInteger(1, 5) ); // 5

Можно использовать решение из предыдущей задачи.
 */

function randomInteger(min, max) {
   const rand = min + Math.random() * (max + 1 - min);
   return Math.floor(rand);
}
