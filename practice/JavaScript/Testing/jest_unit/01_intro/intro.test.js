const { sum, nativeNull } = require("./intro");

describe("sum", () => {
  test("should", () => {
    expect(sum(1, 3)).toBe(4);
    expect(sum(1, 3)).toEqual(4);
  });

  test("should", () => {
    expect(sum(2, 3)).toBeGreaterThan(4);
    expect(sum(2, 3)).toBeGreaterThanOrEqual(5);
    expect(sum(2, 3)).toBeLessThan(10);
    expect(sum(2, 3)).toBeLessThanOrEqual(5);
  });

  test("should", () => {
    expect(sum(0.1, 0.2)).toBeCloseTo(0.3);
  });
});

describe("nativeNull", () => {
  test("should", () => {
    expect(nativeNull()).toBe(null);
    expect(nativeNull()).toBeNull();
    expect(nativeNull()).toBeFalsy(); // undef, null, 0, ''
    expect(nativeNull()).toBeDefined();
    expect(nativeNull()).not.toBeTruthy();
    expect(nativeNull()).not.toBeUndefined();
  });
});
