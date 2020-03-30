import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { observable } from "mobx";
import { observer } from "mobx-react";

const counterState = observable({
  count: 0
});

counterState.increment = function() {
  this.count++;
};

counterState.decrement = function() {
  this.count--;
};

@observer
class Counter extends Component {
  handleIncrement = () => {
    this.props.store.increment();
  };
  handleDecrement = () => {
    this.props.store.decrement();
  };

  render() {
    return (
      <div className="App">
        <h1>{this.props.store.count}</h1>
        <button onClick={this.handleDecrement}>-1</button>
        <button onClick={this.handleIncrement}>+1</button>
      </div>
    );
  }
}

ReactDOM.render(
  <React.StrictMode>
    <Counter store={counterState} />
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();
