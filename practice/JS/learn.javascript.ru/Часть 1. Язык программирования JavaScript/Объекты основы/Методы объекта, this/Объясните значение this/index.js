/**
 * Объясните значение "this"
важность: 3

В представленном ниже коде мы намерены вызвать user.go() метод 4 раза подряд.

Но вызовы (1) и (2) работают иначе, чем (3) и (4). Почему?

let obj, method;

obj = {
  go: function() { alert(this); }
};

obj.go();               // (1) [object Object]

(obj.go)();             // (2) [object Object]

(method = obj.go)();    // (3) undefined

(obj.go || obj.stop)(); // (4) undefined
 */

 // 1) и 2) this равен объекту;
 // 3) и 4) this равен undef т.к. в них копируется функция без контекста
