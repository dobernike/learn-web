/**
 * Меню с таймером для анимации
важность: 5

Есть класс Menu. У него может быть два состояния: открыто STATE_OPEN и закрыто STATE_CLOSED.

Создайте наследника AnimatingMenu, который добавляет третье состояние STATE_ANIMATING.

    При вызове open() состояние меняется на STATE_ANIMATING, а через 1 секунду, по таймеру, открытие завершается вызовом open() родителя.
    Вызов close() при необходимости отменяет таймер анимации (назначаемый в open) и передаёт вызов родительскому close.
    Метод showState для нового состояния выводит "анимация", для остальных – полагается на родителя.

    function Menu(state) {
  this._state = state || Menu.STATE_CLOSED;
};

Menu.STATE_OPEN = 1;
Menu.STATE_CLOSED = 0;

Menu.prototype.open = function () {
  this._state = Menu.STATE_OPEN;
};

Menu.prototype.close = function () {
  this._state = Menu.STATE_CLOSED;
};

Menu.prototype._stateAsString = function () {
  switch (this._state) {
    case Menu.STATE_OPEN:
      return 'открыто';

    case Menu.STATE_CLOSED:
      return 'закрыто';
  }
};

Menu.prototype.showState = function () {
  console.log(this._stateAsString());
};

var AnimatingMenu = Menu; // замените на ваш код для AnimatingMenu

// использование..

var menu = new AnimatingMenu();

menu.showState(); // закрыто

menu.open();
menu.showState(); // анимация

setTimeout(function () {
  menu.showState(); // открыто

  menu.close();
  menu.showState(); // закрыто (закрытие без анимации)
}, 1000);
 */

function Menu(state) {
  this._state = state || Menu.STATE_CLOSED;
};

Menu.STATE_OPEN = 1;
Menu.STATE_CLOSED = 0;

Menu.prototype.open = function () {
  this._state = Menu.STATE_OPEN;
};

Menu.prototype.close = function () {
  this._state = Menu.STATE_CLOSED;
};

Menu.prototype._stateAsString = function () {
  switch (this._state) {
    case Menu.STATE_OPEN:
      console.log('открыто')
      return 'открыто';

    case Menu.STATE_CLOSED:
      console.log('закрыто')
      return 'закрыто';
  }
};

Menu.prototype.showState = function () {
  console.log(this._stateAsString());
};

function AnimatingMenu() {
  Menu.apply(this, arguments);
} // замените на ваш код для AnimatingMenu
AnimatingMenu.prototype = Object.create(Menu.prototype);

AnimatingMenu.prototype.STATE_ANIMATING = 2;

AnimatingMenu.prototype.open = function () {
  this._state = this.STATE_ANIMATING;
  this._timer = setTimeout(() => Menu.prototype.open.call(this), 1000);
}

AnimatingMenu.prototype.close = function () {
  clearTimeout(this._timer);
  Menu.prototype.close.call(this);
}

AnimatingMenu.prototype.showState = function () {
  switch (this._state) {
    case this.STATE_ANIMATING:
      console.log('анимация');
      return 'анимация';

    default:
      return Menu.prototype._stateAsString.call(this);
  }
}
// использование..

var menu = new AnimatingMenu();

menu.showState(); // закрыто

menu.open();
menu.showState(); // анимация

setTimeout(function () {
  menu.showState(); // открыто

  menu.close();
  menu.showState(); // закрыто (закрытие без анимации)
}, 1000);

