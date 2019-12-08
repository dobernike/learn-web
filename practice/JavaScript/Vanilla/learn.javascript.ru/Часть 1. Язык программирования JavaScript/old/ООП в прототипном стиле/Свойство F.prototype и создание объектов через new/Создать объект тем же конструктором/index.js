/**
 * Создать объект тем же конструктором
важность: 5

Пусть у нас есть произвольный объект obj, созданный каким-то конструктором, каким – мы не знаем, но хотели бы создать новый объект с его помощью.

Сможем ли мы сделать так?

var obj2 = new obj.constructor();

Приведите пример конструкторов для obj, при которых такой код будет работать верно – и неверно.
 */

//
const User = function (name) {
  this.name = name;
}

obj1 = new User('asf')
var obj2 = new obj1.constructor('gg');
console.log(obj2.name);

User.prototype = {};

obj3 = new User('asf');
var obj4 = new obj3.constructor();
console.log(obj4.name);