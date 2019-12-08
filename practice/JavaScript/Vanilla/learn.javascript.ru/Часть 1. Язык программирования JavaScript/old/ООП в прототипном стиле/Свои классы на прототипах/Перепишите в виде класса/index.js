/**
 Перепишите в виде класса
важность: 5

Есть класс CoffeeMachine, заданный в функциональном стиле.

Задача: переписать CoffeeMachine в виде класса с использованием прототипа.

Исходный код:

function CoffeeMachine(power) {
  var waterAmount = 0;

  var WATER_HEAT_CAPACITY = 4200;

  function getTimeToBoil() {
    return waterAmount * WATER_HEAT_CAPACITY * 80 / power;
  }

  this.run = function() {
    setTimeout(function() {
      alert( 'Кофе готов!' );
    }, getTimeToBoil());
  };

  this.setWaterAmount = function(amount) {
    waterAmount = amount;
  };

}

var coffeeMachine = new CoffeeMachine(10000);
coffeeMachine.setWaterAmount(50);
coffeeMachine.run();

P.S. При описании через прототипы локальные переменные недоступны методам, поэтому нужно будет переделать их в защищённые свойства.
 */

function CoffeeMachine(power) {
  this._power = power;
  this._waterAmount = 0;
  
}

CoffeeMachine.prototype.WATER_HEAT_CAPACITY = 4200;

CoffeeMachine.prototype._getTimeToBoil = function() {
  return this._waterAmount * this.WATER_HEAT_CAPACITY * 80 / this._power;
}

CoffeeMachine.prototype.run = function() {
  setTimeout(function() {
    console.log( 'Кофе готов!' );
  }, this._getTimeToBoil());
}

CoffeeMachine.prototype.setWaterAmount = function(amount) {
  this._waterAmount = amount;
}

var coffeeMachine = new CoffeeMachine(10000);
coffeeMachine.setWaterAmount(50);
coffeeMachine.run();
