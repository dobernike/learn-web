import React, { Component } from "react";
import "./App.scss";
import { connect } from "react-redux";

class App extends Component {

  updateCounter(value) {
    // this.setState({
    //   counter: this.props.counter + value
    // });
  }

  render() {
    return (
      <div className={"App"}>
        <h1>
          Счетчик <strong>{this.props.counter}</strong>
        </h1>

        <hr />

        <div className="Actions">
          <button onClick={() => this.updateCounter(1)}>Добавить 1</button>
          <button onClick={() => this.updateCounter(-1)}>Вычесть 1</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  counter: state.counter
});

export default connect(mapStateToProps)(App);
