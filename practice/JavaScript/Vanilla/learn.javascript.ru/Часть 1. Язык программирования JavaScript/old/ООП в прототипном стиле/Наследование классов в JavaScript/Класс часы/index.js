/**
 * Класс "часы"
важность: 5

Есть реализация часиков, оформленная в виде одной функции-конструктора. У неё есть приватные свойства timer, template и метод render.

Задача: переписать часы на прототипах. Приватные свойства и методы сделать защищёнными.

P.S. Часики тикают в браузерной консоли (надо открыть её, чтобы увидеть).

function Clock(options) {

  var template = options.template;
  var timer;

  function render() {
    var date = new Date();

    var hours = date.getHours();
    if (hours < 10) hours = '0' + hours;

    var min = date.getMinutes();
    if (min < 10) min = '0' + min;

    var sec = date.getSeconds();
    if (sec < 10) sec = '0' + sec;

    var output = template.replace('h', hours).replace('m', min).replace('s', sec);

    console.log(output);
  }

  this.stop = function() {
    clearInterval(timer);
  };

  this.start = function() {
    render();
    timer = setInterval(render, 1000);
  }

}
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

const clock = new Clock({
  template: 'h:m:s'
});
clock.start();
