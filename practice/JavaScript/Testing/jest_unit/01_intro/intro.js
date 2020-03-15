function expect(value) {
  return {
    toBe: exp => {
      if (value === exp) {
        console.log("Success");
      } else {
        console.error(`Value is ${value}, but expection is ${exp}`);
      }
    }
  };
}

const sum = (a, b) => a + b;

const nativeNull = () => null;

expect(sum(41, 1)).toBe(42);

module.exports = { sum, nativeNull };
