
// Задачи:

// — функция которая переводит пример - AAABBBSSSSLLAL в a3b3s4l2a1l1
function stringify(string) {
  const arr = string.toLowerCase().split('');
  let count = 1;

  return arr
    .map((char, idx) => {
      let str = count + char;

      if (idx === 0) {
        str = char;
      }

      if (char === arr[idx - 1]) {
        count += 1;

        if (idx === arr.length - 1) {
          return count;
        }

        return null;
      }

      if (idx === arr.length - 1) {

        if (count !== 1) {
          str = count + char + 1;
        } else {
          str = char + count;
        }

      }

      count = 1;
      return str;
    })
    .join('');
}

console.log('stringify', stringify('AAABBBSSSSLLAL')); // = a3b3s4l2a1l1

// — функция которая проверит правильно ли расставлены скобки в строке.
function isBracketsFine(brackets) {
  const arr = brackets.split('');

  let counter = 0;

  for (const bracket of arr) {
    if (counter < 0) return false;

    switch (bracket) {
      case '(':
        counter += 1;
        break;

      case ')':
        counter -= 1;
        break;

      default:
        return `Ошибка! Ожидаются только скобки '(' и ')'`;
    }
  }

  return counter === 0;
}

console.log('isBracketsFine', isBracketsFine('((()))')) // true;
console.log('isBracketsFine', isBracketsFine('(()))')) // false;
console.log('isBracketsFine', isBracketsFine('))(')) // false;
console.log('isBracketsFine', isBracketsFine('(())()()(())')) // true;

// — функция которая проверит отсортирован ли массив.:
function isSort(arr) {
  let increase = null;

  return arr.every((item, idx) => {
    if (idx === 0) return true;

    if (increase === null) {

      if (item !== arr[idx - 1]) {
        increase = item > arr[idx - 1];
      }

      return true;
    }

    if ((item >= arr[idx - 1] && increase)
      || (item <= arr[idx - 1] && !increase)) return true;

    return false;
  });
}

console.log('isSort', isSort([1, 2, 3])) // = true;
console.log('isSort', isSort([3, 2, 1])) // = true;
console.log('isSort', isSort([1, 1, 1])) // = true;
console.log('isSort', isSort([1, 2, 2, 3])) // = true;
console.log('isSort', isSort([1, 4, 2])) // = false;