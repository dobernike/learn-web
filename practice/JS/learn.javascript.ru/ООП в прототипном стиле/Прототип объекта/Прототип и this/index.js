/*
Прототип и this
важность: 5

Сработает ли вызов rabbit.eat() ?

Если да, то в какой именно объект он запишет свойство full: в rabbit или animal?

var animal = {
  eat: function() {
    this.full = true;
  }
};

var rabbit = {
  __proto__: animal
};

rabbit.eat();
*/

var animal = {
  eat: function() {
    this.full = true;
  }
};

var rabbit = {
  __proto__: animal
};

rabbit.eat();

// Сработает и запишет в rabbit