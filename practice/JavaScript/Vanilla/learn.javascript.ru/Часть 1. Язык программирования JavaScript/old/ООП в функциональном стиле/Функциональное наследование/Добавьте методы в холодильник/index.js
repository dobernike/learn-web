/*
Добавьте методы в холодильник
важность: 5

Добавьте в холодильник методы:

    Публичный метод filterFood(func), который возвращает всю еду, для которой func(item) == true
    Публичный метод removeFood(item), который удаляет еду item из холодильника.

Код для проверки:

var fridge = new Fridge(500);
fridge.enable();
fridge.addFood({
  title: "котлета",
  calories: 100
});
fridge.addFood({
  title: "сок",
  calories: 30
});
fridge.addFood({
  title: "зелень",
  calories: 10
});
fridge.addFood({
  title: "варенье",
  calories: 150
});

fridge.removeFood("нет такой еды"); // без эффекта
alert( fridge.getFood().length ); // 4

var dietItems = fridge.filterFood(function(item) {
  return item.calories < 50;
});

dietItems.forEach(function(item) {
  alert( item.title ); // сок, зелень
  fridge.removeFood(item);
});

alert( fridge.getFood().length ); // 2

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
}


var fridge = new Fridge(500);
fridge.enable();
fridge.addFood({
  title: "котлета",
  calories: 100
});
fridge.addFood({
  title: "сок",
  calories: 30
});
fridge.addFood({
  title: "зелень",
  calories: 10
});
fridge.addFood({
  title: "варенье",
  calories: 150
});

fridge.removeFood("нет такой еды"); // без эффекта
console.log(fridge.getFood().length); // 4

var dietItems = fridge.filterFood(function (item) {
  return item.calories < 50;
});

dietItems.forEach(function (item) {
  console.log(item.title); // сок, зелень
  fridge.removeFood(item);
});

console.log(fridge.getFood().length); // 2