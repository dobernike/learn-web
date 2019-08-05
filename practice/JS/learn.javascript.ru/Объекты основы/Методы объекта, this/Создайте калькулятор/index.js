/**
 * Создайте калькулятор
важность: 5

Создайте объект calculator (калькулятор) с тремя методами:

    read() (читать) запрашивает два значения и сохраняет их как свойства объекта.
    sum() (суммировать) возвращает сумму сохранённых значений.
    mul() (умножить) перемножает сохранённые значения и возвращает результат.

let calculator = {
  // ... ваш код ...
};

calculator.read();
alert( calculator.sum() );
alert( calculator.mul() );
 */

// Создайте объект calculator (калькулятор) с тремя методами:
let calculator = {
  //     read() (читать) запрашивает два значения и сохраняет их как свойства объекта.
  read() {
    this.a = +prompt('first numb', 0);
    this.b = +prompt('second numb', 0);
  },
  //     sum() (суммировать) возвращает сумму сохранённых значений.
  sum() {
    return this.a + this.b;
  },
  //     mul() (умножить) перемножает сохранённые значения и возвращает результат.
  mul() {
    return this.a * this.b;
  }
};




calculator.read();
console.log(calculator.sum());
console.log(calculator.mul());
