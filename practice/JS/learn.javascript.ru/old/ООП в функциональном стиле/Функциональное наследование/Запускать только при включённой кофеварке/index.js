/*
Запускать только при включённой кофеварке
важность: 5

В коде CoffeeMachine сделайте так, чтобы метод run выводил ошибку, если кофеварка выключена.

В итоге должен работать такой код:

var coffeeMachine = new CoffeeMachine(10000);
coffeeMachine.run(); // ошибка, кофеварка выключена!

А вот так – всё в порядке:

var coffeeMachine = new CoffeeMachine(10000);
coffeeMachine.enable();
coffeeMachine.run(); // ...Кофе готов!
*/

function Machine(power) {
  this._enabled = false;

  this.enable = function () {
    this._enabled = true;
  };

  this.disable = function () {
    this._enabled = false;
  };
}

function CoffeeMachine(power) {
  Machine.apply(this, arguments);

  var waterAmount = 0;

  this.setWaterAmount = function (amount) {
    waterAmount = amount;
  };

  function onReady() {
    console.log('Кофе готово!');
  }

  this.run = function () {
    if (!this._enabled) {
      throw new Error('Ошибка, кофеварка выключена!');
    }

    setTimeout(onReady, 1000);
  };

}

// В итоге должен работать такой код:

// var coffeeMachine = new CoffeeMachine(10000);
// coffeeMachine.run(); // ошибка, кофеварка выключена!

// А вот так – всё в порядке:

var coffeeMachine = new CoffeeMachine(10000);
coffeeMachine.enable();
coffeeMachine.run(); // ...Кофе готов!