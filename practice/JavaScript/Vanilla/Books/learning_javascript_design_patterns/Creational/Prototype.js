// using Object.create as was recommended by ES5 stabdard
const car = {
  noOfWheels: 4,
  start() {
    return "started";
  },
  stop() {
    return "stopped";
  }
};

// Object.create(proto[, propertiesObject])

const myCar = Object.create(car, { owner: { value: "John" } });

console.log(myCar.__proto__ === car); // true
