import React, { Component } from "react";
import "./App.scss";
import { connect } from "react-redux";
import Counter from "./Counter";

class App extends Component {
  render() {
    return (
      <div className={"App"}>
        <h1>
          Счетчик <strong>{this.props.counter}</strong>
        </h1>

        <hr />

        <div className="Actions">
          <button onClick={this.props.onAdd}>Добавить 1</button>
          <button onClick={this.props.onSub}>Вычесть 1</button>
        </div>
        <div className="Actions">
          <button onClick={() => this.props.onAddNumber(15)}>
            Добавить 15
          </button>
          <button onClick={this.props.onAddNumber.bind(null, -19)}>
            Вычесть 19
          </button>
        </div>

        <Counter />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  counter: state.counter1.counter
});

const mapDispatchToProps = dispatch => ({
  onAdd: () => dispatch({ type: "ADD" }),
  onSub: () => dispatch({ type: "SUB" }),
  onAddNumber: number => dispatch({ type: "ADD_NUMBER", payload: number })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
