const cars: string[] = ["Ford", "Audi"];
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
