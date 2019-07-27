/**
 * Класс "расширенные часы"
важность: 5

Есть реализация часиков на прототипах. Создайте класс, расширяющий её, добавляющий поддержку параметра precision, который будет задавать частоту тика в setInterval. Значение по умолчанию: 1000.

    Для этого класс Clock надо унаследовать. Пишите ваш новый код в файле extended-clock.js.
    Исходный класс Clock менять нельзя.
    Пусть конструктор потомка вызывает конструктор родителя. Это позволит избежать проблем при расширении Clock новыми опциями.

P.S. Часики тикают в браузерной консоли (надо открыть её, чтобы увидеть).
 */

function Clock(options) {
  this._template = options.template;
}

Clock.prototype._render = function () {
  const date = new Date();

  let hours = date.getHours();
  if (hours < 10) hours = '0' + hours;

  let min = date.getMinutes();
  if (min < 10) min = '0' + min;

  let sec = date.getSeconds();
  if (sec < 10) sec = '0' + sec;

  const output = this._template.replace('h', hours).replace('m', min).replace('s', sec);

  console.log(output);
}

Clock.prototype.stop = function () {
  clearInterval(this._timer);
};

Clock.prototype.start = function () {
  this._render();
  this._timer = setInterval(() => this._render(), 1000);
}

// const clock = new Clock({
// template: 'h:m:s'
// });
// clock.start();


/* ... ваш код для ExtendedClock */

/*
Надо: часы, которые тикают раз в 10 секунд (точность 10000)
var lowResolutionClock = new ExtendedClock({
    template: 'h:m:s',
    precision: 10000
});

lowResolutionClock.start();
*/

function extend(Child, Parent) {
  Child.prototype = inherit(Parent.prototype);
  Child.prototype.constructor = Child;
  Child.parent = Parent.prototype;
}

function inherit(proto) {
  function F() { }
  F.prototype = proto;
  return new F;
}

// ваш код

function ExtendedClock(options) {
  Clock.apply(this, arguments);
  this._precision = +options.precision || 1000;
};

ExtendedClock.prototype = Object.create(Clock.prototype);
ExtendedClock.prototype.constructor = ExtendedClock;
ExtendedClock.parent = Clock.prototype;

ExtendedClock.prototype.start = function () {
  this._render();
  this._timer = setInterval(() => this._render(), this._precision);
}

var lowResolutionClock = new ExtendedClock({
  template: 'h:m:s',
  precision: 10000
});

lowResolutionClock.start();