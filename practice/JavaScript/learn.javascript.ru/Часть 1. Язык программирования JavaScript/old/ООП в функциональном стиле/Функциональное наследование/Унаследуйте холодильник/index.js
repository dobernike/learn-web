/*
Унаследуйте холодильник
важность: 4

Создайте класс для холодильника Fridge(power), наследующий от Machine, с приватным свойством food и методами addFood(...), getFood():

    Приватное свойство food хранит массив еды.
    Публичный метод addFood(item) добавляет в массив food новую еду, доступен вызов с несколькими аргументами addFood(item1, item2...) для добавления нескольких элементов сразу.
    Если холодильник выключен, то добавить еду нельзя, будет ошибка.
    Максимальное количество еды ограничено power/100, где power – мощность холодильника, указывается в конструкторе. При попытке добавить больше – будет ошибка
    Публичный метод getFood() возвращает еду в виде массива, добавление или удаление элементов из которого не должно влиять на свойство food холодильника.

Код для проверки:

var fridge = new Fridge(200);
fridge.addFood("котлета"); // ошибка, холодильник выключен

Ещё код для проверки:

// создать холодильник мощностью 500 (не более 5 еды)
var fridge = new Fridge(500);
fridge.enable();
fridge.addFood("котлета");
fridge.addFood("сок", "зелень");
fridge.addFood("варенье", "пирог", "торт"); // ошибка, слишком много еды

Код использования холодильника без ошибок:

var fridge = new Fridge(500);
fridge.enable();
fridge.addFood("котлета");
fridge.addFood("сок", "варенье");

var fridgeFood = fridge.getFood();
alert( fridgeFood ); // котлета, сок, варенье

// добавление элементов не влияет на еду в холодильнике
fridgeFood.push("вилка", "ложка");

alert( fridge.getFood() ); // внутри по-прежнему: котлета, сок, варенье

Исходный код класса Machine, от которого нужно наследовать:

function Machine(power) {
  this._power = power;
  this._enabled = false;

  var self = this;

  this.enable = function() {
    self._enabled = true;
  };

  this.disable = function() {
    self._enabled = false;
  };
}  
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
}


// var fridge = new Fridge(200);
// fridge.addFood("котлета"); // ошибка, холодильник выключен


// создать холодильник мощностью 500 (не более 5 еды)
// var fridge = new Fridge(500);
// fridge.enable();
// fridge.addFood("котлета");
// fridge.addFood("сок", "зелень");
// fridge.addFood("варенье", "пирог", "торт"); // ошибка, слишком много еды

var fridge = new Fridge(500);
fridge.enable();
fridge.addFood("котлета");
fridge.addFood("сок", "варенье");

var fridgeFood = fridge.getFood();
console.log(fridgeFood); // котлета, сок, варенье

// добавление элементов не влияет на еду в холодильнике
fridgeFood.push("вилка", "ложка");

console.log(fridge.getFood()); // внутри по-прежнему: котлета, сок, варенье
