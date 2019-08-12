/*
Переопределите disable
важность: 5

Переопределите метод disable холодильника, чтобы при наличии в нём еды он выдавал ошибку.

Код для проверки:

var fridge = new Fridge(500);
fridge.enable();
fridge.addFood("кус-кус");
fridge.disable(); // ошибка, в холодильнике есть еда

В качестве исходного кода используйте решение предыдущей задачи.
*/

function Machine(power) {
  this._power = power;
  this._enabled = false;

  var self = this;

  this.enable = function () {
    self._enabled = true;
  };

  this.disable = function () {
    self._enabled = false;
  };
}

function Fridge(power) {
  Machine.apply(this, arguments);

  let food = [];
  const volume = this._power / 100;

  this.addFood = function (...items) {
    if (!this._enabled) {
      throw new Error('ошибка, холодильник выключен')
    }

    if (food.length + items.length > volume) {
      throw new Error('ошибка, слишком много еды')
    }

    items.map(item => food.push(item));
  }

  this.getFood = function () {
    return [...food];
  }

  //Добавьте в холодильник методы:
  // Публичный метод filterFood(func), который возвращает всю еду, для которой func(item) == true
  this.filterFood = function (filter) {
    return food.filter(filter);
  }
  // Публичный метод removeFood(item), который удаляет еду item из холодильника.
  this.removeFood = function (item) {
    food = food.filter(fridgeFood => fridgeFood !== item);
  }

  // Переопределите метод disable холодильника, чтобы при наличии в нём еды он выдавал ошибку.
  const parentDisabled = this.disable;
  this.disable = function () {
    if (food.length) {
      throw new Error('ошибка, в холодильнике есть еда')
    }
    parentDisabled();
  }
}

// Код для проверки:

var fridge = new Fridge(500);
fridge.enable();
fridge.addFood("кус-кус");
fridge.disable(); // ошибка, в холодильнике есть еда