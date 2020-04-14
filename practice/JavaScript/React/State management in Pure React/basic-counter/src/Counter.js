import React from "react";

const getStateFromLocalStorage = () => {
  const storage = localStorage.getItem("counterState");
  if (storage) return JSON.parse(storage);
  return { count: 0 };
};

const storeStateInLocalStorage = (state) => {
  localStorage.setItem("counterState", JSON.stringify(state));
};

document.title = "Hello";

const Counter = ({ max, step }) => {
  const [count, setCount] = React.useState(0);

  const increment = () => {
    setCount((c) => {
      if (c >= max) return c;
      return c + step;
    });
  };
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(0);

  return (
    <section className="Counter">
      <h1>Count: {count}</h1>
      <button onClick={increment} className="full-width">
        Increment
      </button>
      <button onClick={decrement} className="full-width">
        Decrement
      </button>
      <button onClick={reset} className="full-width">
        Reset
      </button>
    </section>
  );
};

export default Counter;
