/**
 * Создание калькулятора при помощи конструктора
важность: 5

Создайте функцию-конструктор Calculator, который создаёт объекты с тремя методами:

    read() запрашивает два значения при помощи prompt и сохраняет их значение в свойствах объекта.
    sum() возвращает сумму введённых свойств.
    mul() возвращает произведение введённых свойств.

Например:

let calculator = new Calculator();
calculator.read();

alert( "Sum=" + calculator.sum() );
alert( "Mul=" + calculator.mul() );
 */

//Создайте функцию-конструктор Calculator, который создаёт объекты с тремя методами:
function Calculator() {
  //  read() запрашивает два значения при помощи prompt и сохраняет их значение в свойствах объекта.
  this.read = function () {
    this.a = +prompt('a?', 0);
    this.b = +prompt('b?', 0);
  }
  //     sum() возвращает сумму введённых свойств.
  this.sum = function () {
    return this.a + this.b;
  }
  //     mul() возвращает произведение введённых свойств.
  this.mul = function () {
    return this.a * this.b;
  }
}