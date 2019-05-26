"use strict";

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

var App = function App() {
  _classCallCheck(this, App);

  _defineProperty(this, "run", function() {
    var name =
      arguments.length > 0 && arguments[0] !== undefined
        ? arguments[0]
        : "World";
    console.log("Hello ".concat(name));
  });
};

var app = new App();
app.run();
