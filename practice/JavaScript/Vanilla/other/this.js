function hello() {
  console.log("Hello", this);
}

hello(); // window  (window.hello())

const person = {
  name: "Paul",
  age: 26,
  sayHello: hello,
  sayHelloWindow: hello.bind(this), // or window
  logInfo: function(job, phone) {
    console.group(`${this.name} info:`);
    console.log(`Name is ${this.name}`);
    console.log(`Age is ${this.age}`);
    console.log(`Job is ${job}`);
    console.log(`Phone is ${phone}`);
    console.groupEnd();
  }
};

person.sayHello(); // person
person.sayHelloWindow(); // window
person.logInfo(); // Paul

const lena = {
  name: "Elena",
  age: 23
};

person.logInfo.bind(lena)(); // Elena

person.logInfo.bind(lena, "Frontend", "8-999-123-12-23")();
person.logInfo.call(lena, "Frontend", "8-999-123-12-23");
person.logInfo.apply(lena, ["Frontend", "8-999-123-12-23"]);

// =========

const array = [1, 2, 3, 4, 5];

function multBy(arr, n) {
  return arr.map(function(i) {
    return i * n;
  });
}

console.log(multBy(array, 15)); // [15, 30, 45, 60, 75]

// or
Array.prototype.multBy = function(n) {
  return this.map(function(i) {
    return i * n;
  });
};

console.log(array.multBy(15)); // [15, 30, 45, 60, 75]
