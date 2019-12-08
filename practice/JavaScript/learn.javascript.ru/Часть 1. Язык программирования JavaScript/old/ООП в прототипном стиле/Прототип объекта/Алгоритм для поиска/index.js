/**
 * Алгоритм для поиска
важность: 5

Есть объекты:

var head = {
  glasses: 1
};

var table = {
  pen: 3
};

var bed = {
  sheet: 1,
  pillow: 2
};

var pockets = {
  money: 2000
};

Задание состоит из двух частей:

    Присвойте объектам ссылки __proto__ так, чтобы любой поиск чего-либо шёл по алгоритму pockets -> bed -> table -> head.

    То есть pockets.pen == 3, bed.glasses == 1, но table.money == undefined.

    После этого ответьте на вопрос, как быстрее искать glasses: обращением к pockets.glasses или head.glasses? Попробуйте протестировать.

 */

// 1) Присвойте объектам ссылки __proto__ так, чтобы любой поиск чего-либо шёл по алгоритму pockets -> bed -> table -> head.

var head = {
  glasses: 1
};

var table = {
  pen: 3
};
table.__proto__ = head;

var bed = {
  sheet: 1,
  pillow: 2
};
bed.__proto__ = table;

var pockets = {
  money: 2000
};
pockets.__proto__ = bed;

// То есть pockets.pen == 3, bed.glasses == 1, но table.money == undefined.
console.log(pockets.pen); // 3
console.log(bed.glasses); // 1
console.log(table.money); // undefined

// 2) После этого ответьте на вопрос, как быстрее искать glasses: обращением к pockets.glasses или head.glasses? Попробуйте протестировать.

/**
 * В современных браузерах, с точки зрения производительности, нет разницы, брать свойство из объекта или прототипа. Они запоминают, где было найдено свойство и в следующий раз при запросе, к примеру, pockets.glasses начнут искать сразу в прототипе (head).
 */
