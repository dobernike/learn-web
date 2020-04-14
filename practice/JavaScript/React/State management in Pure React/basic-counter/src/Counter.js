import React, { Component } from "react";

const getStateFromLocalStorage = () => {
  const storage = localStorage.getItem("counterState");
  if (storage) return JSON.parse(storage);
  return { count: 0 };
};

const storeStateInLocalStorage = (state) => {
  localStorage.setItem("counterState", JSON.stringify(state));
};

export default class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = getStateFromLocalStorage();

    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
    this.reset = this.reset.bind(this);
  }

  increment() {
    this.setState(
      (state, props) => {
        const { max, step } = props;
        if (state.count >= max) return;
        return { count: state.count + step };
      },
      () => storeStateInLocalStorage(this.state)
    );

    console.log("Before!", this.state);
  }

  decrement() {
    this.setState({ count: this.state.count - 1 });
  }

  reset() {
    this.setState({ count: 0 });
  }

  render() {
    const { count } = this.state;
    return (
      <section className="Counter">
        <h1>Count: {count}</h1>
        <button onClick={this.increment} className="full-width">
          Increment
        </button>
        <button onClick={this.decrement} className="full-width">
          Decrement
        </button>
        <button onClick={this.reset} className="full-width">
          Reset
        </button>
      </section>
    );
  }
}
