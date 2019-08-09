/**
 * Максимальная зарплата
важность: 5

У нас есть объект salaries с зарплатами:

let salaries = {
  "John": 100,
  "Pete": 300,
  "Mary": 250
};

Создайте функцию topSalary(salaries), которая возвращает имя самого высокооплачиваемого сотрудника.

    Если объект salaries пустой, то нужно вернуть null.
    Если несколько высокооплачиваемых сотрудников, то нужно вернуть их всех.

P.S. Используйте Object.entries и деструктурирование, чтобы перебрать пары ключ/значение.
 */

let salaries = {
  John: 100,
  Pete: 300,
  Mary: 250
};

function topSalary(salaries) {
  let name = null;
  let sum = 0;

  for (const [user, total] of Object.entries(salaries)) {
    if (total > sum) {
      sum = total;
      name = user;
    }
  }

  return name;
}
