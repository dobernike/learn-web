const Lodash = require("./sync");

let _ = new Lodash();

describe("Lodash: compact", () => {
  let array;

  beforeEach(() => {
    array = [false, 42, 0, "", true, null, "hello"];
  });

  afterAll(() => {
    _ = new Lodash();
  });

  test("should be defined", () => {
    expect(_.compact).toBeDefined();
    expect(_.compact).not.toBeUndefined();
  });

  test("should working array", () => {
    array.push(...["one", "two"]);
    expect(array).toContain("one");
    expect(array).toContain("two");
  });

  test("should remove false", () => {
    const result = [42, true, "hello"];
    expect(_.compact(array)).not.toBe(result); // toEqual !== toBe for {} or []
    expect(_.compact(array)).toEqual(result);
  });

  test("should not contain falsy", () => {
    expect(_.compact(array)).not.toContain(false);
    expect(_.compact(array)).not.toContain(0);
    expect(_.compact(array)).not.toContain("");
    expect(_.compact(array)).not.toContain(null);
  });
});

describe("Lodash groupBy", () => {
  test("should be defined", () => {
    expect(_.groupBy).toBeDefined();
    expect(_.groupBy).not.toBeUndefined();
  });

  test("should group array items by Math.floor", () => {
    const array = [2.2, 2.4, 4.2, 3.1];
    const result = {
      2: [2.2, 2.4],
      4: [4.2],
      3: [3.1]
    };
    expect(_.groupBy(array, Math.floor)).toEqual(result);
  });

  test("should group array items by Math.floor", () => {
    const array = ["one", "two", "three"];
    const result = {
      5: ["three"],
      3: ["one", "two"]
    };
    expect(_.groupBy(array, "length")).toEqual(result);
  });

  test("should group array items by Math.floor", () => {
    expect(_.groupBy([], Math.trunc)).not.toBeInstanceOf(Array);
  });
});
