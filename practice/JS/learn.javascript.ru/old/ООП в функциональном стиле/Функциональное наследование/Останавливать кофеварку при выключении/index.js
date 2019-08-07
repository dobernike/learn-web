/*
Останавливать кофеварку при выключении
важность: 5

Когда кофеварку выключают – текущая варка кофе должна останавливаться.

Например, следующий код кофе не сварит:

var coffeeMachine = new CoffeeMachine(10000);
coffeeMachine.enable();
coffeeMachine.run();
coffeeMachine.disable(); // остановит работу, ничего не выведет

Реализуйте это на основе решения предыдущей задачи.
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
  let timerId = null;

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
    timerId = setTimeout(onReady, 1000);
  };

  const parentDisable = this.disable;
  this.disable = function () {
    parentDisable.call(this);
    clearTimeout(timerId);
  }

}

var coffeeMachine = new CoffeeMachine(10000);
coffeeMachine.enable();
coffeeMachine.run();
coffeeMachine.disable(); // остановит работу, ничего не выведет