/**
 * Вывод односвязного списка в обратном порядке
важность: 5

Выведите односвязный список из предыдущего задания Вывод односвязного списка в обратном порядке.

Сделайте два решения: с использованием цикла и через рекурсию.
 */

let list = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: 4,
        next: null
      }
    }
  }
};

reverse(list);

function reverse(list) {
  // рекурсия
  // if (list.next) {
  //   reverse(list.next);
  // }

  // console.log(list.value)

  // цикл
  let tmp = list;
  let arr = [];
  while (tmp) {
    arr.push(tmp.value);
    tmp = tmp.next;
  }

  for (let i = arr.length - 1; i >= 0; i--) {
    console.log(arr[i]);
  }
}
