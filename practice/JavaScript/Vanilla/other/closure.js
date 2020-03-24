function createCalFunction(n) {
  return function() {
    console.log(1000 * n);
  };
}

const calc = createCalFunction(42);
calc(); // 42000

function createIncrementor(n) {
  return function(num) {
    return n + num;
  };
}

const addOne = createIncrementor(1);
const addTen = createIncrementor(10);

addOne(10); // 11
addOne(41); // 42

addTen(10); // 20
addTen(41); // 51

function urlGenerator(domain) {
  return function(url) {
    return `https://${url}.${domain}`;
  };
}

const comUrl = urlGenerator("com");
const ruUrl = urlGenerator("ru");

comUrl("google"); // https://google.com
comUrl("netflix"); // https://netflix.com

ruUrl("yandex"); // https://yandex.ru
ruUrl("vkontakte"); // https://vkontakte.ru

// Реализация функции bind
function bind(context, fn) {
  return function(...args) {
    return fn.apply(context, args);
  };
}
