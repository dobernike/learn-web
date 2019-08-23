/**
 * Соедините типизированные массивы
Дан массив из типизированных массивов Uint8Array. Напишите функцию concat(arrays), которая объединяет эти массивы в один типизированный массив и возвращает его.
 */

function concat(arrays) {
  // ...ваш код...
  const arraysLength = arrays.reduce((prev, next) => prev + next.length, 0);

  const newArray = new Uint8Array(arraysLength);

  let length = 0;
  for (const array of arrays) {
    newArray.set(array, length);
    length += array.length;
  }
  return newArray;
}

let chunks = [
  new Uint8Array([0, 1, 2]),
  new Uint8Array([3, 4, 5]),
  new Uint8Array([6, 7, 8])
];

console.log(Array.from(concat(chunks))); // 0, 1, 2, 3, 4, 5, 6, 7, 8

console.log(concat(chunks).constructor.name); // Uint8Array
