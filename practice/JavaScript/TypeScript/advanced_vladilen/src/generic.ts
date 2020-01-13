const cars1: string[] = ["Ford", "Audi"];
// generic
const cars2: Array<string> = ["Ford", "Audi"];

// const promise = new Promise<string>(resolve => {
//   setTimeout(() => {
//     resolve("Promise resolved");
//   }, 2000);
// });

const promise: Promise<string> = new Promise(resolve => {
  setTimeout(() => {
    resolve("Promise resolved");
  }, 2000);
});

promise.then(data => {
  console.log(data.trim());
});

function mergeObjects<T extends object, R extends object>(a: T, b: R) {
  return Object.assign({}, a, b);
}

const merged = mergeObjects({ name: "Paul" }, { age: 26 });
const merged2 = mergeObjects({ model: "Ford" }, { year: 2010 });
// const merged3 = mergeObjects("aaa", "bbb");
// console.log(merged.age);
// console.log(merged.name);

// console.log(merged3);

// ===================

interface ILength {
  length: number;
}

function withCount<T extends ILength>(value: T): { value: T; count: string } {
  return {
    value,
    count: `In this object ${value.length} chars`
  };
}

console.log(withCount("Hello world"));
console.log(withCount(["I", "Am", "Array"]));
// console.log(withCount(20));
console.log(withCount({ length: 20 }));

// ====================
function getObjectValue<T extends object, R extends keyof T>(obj: T, key: R) {
  return obj[key];
}

const person = {
  name: "Paul",
  age: 26
};
console.log(getObjectValue(person, "name"));
console.log(getObjectValue(person, "age"));
// console.log(getObjectValue(person, "job"));

// ===================

class Collection<T> {
  constructor(private _items: T[] = []) {}

  add(item: T) {
    this._items.push(item);
  }

  remove(item: T) {
    this._items = this._items.filter(i => i !== item);
  }

  get items() {
    return this._items;
  }
}

const strings = new Collection(["I", "Am", "Strings"]);
strings.add("!");
strings.remove("Am");
console.log(strings.items);
// strings.add(2);

const numbers = new Collection([1, 2, 3]);
numbers.add(4);
numbers.remove(2);
console.log(numbers.items);
// numbers.add('sf');

// const objs = new Collection([{ a: 1 }, { b: 2 }]);
// objs.remove({ b: 2 });
// console.log(objs.items);

// ===============

interface Car {
  model: string;
  year: number;
}

function createAndValidateCar(model: string, year: number): Car {
  const car: Partial<Car> = {};

  if (model.length > 3) {
    car.model = model;
  }

  if (year > 2000) {
    car.year = year;
  }

  return car as Car;
}

///

const cars: Readonly<Array<string>> = ["Ford", "Audi"];
// cars.shift();
// cars[1]

const ford: Readonly<Car> = {
  model: "Ford",
  year: 2020
};

// ford.model = "Ferrari";
