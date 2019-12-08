/**
 * Сумма свойств объекта
важность: 5

Есть объект salaries с произвольным количеством свойств, содержащих заработные платы.

Напишите функцию sumSalaries(salaries), которая возвращает сумму всех зарплат с помощью метода Object.values и цикла for..of.

Если объект salaries пуст, то результат должен быть 0.

Например:

let salaries = {
  "John": 100,
  "Pete": 300,
  "Mary": 250
};

alert( sumSalaries(salaries) ); // 650
 */

function sumSalaries(salaries) {
  return Object.values(salaries).reduce((a, b) => a + b, 0);
  let total = 0;

  for (const salarie of Object.values(salaries)) {
    total += +salarie;
  }

  return total;
}

let salaries = {
  John: 100,
  Pete: 300,
  Mary: 250
};

console.log(sumSalaries(salaries)); // 650
