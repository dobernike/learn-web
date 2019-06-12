import React, { Component } from "react";
import "./App.css";
import Car from "./Car/Car";

class App extends Component {
  state = {
    cars: [
      { name: "Ford", year: 2013 },
      { name: "Vw", year: 1993 },
      { name: "Audi", year: 2018 }
    ],
    pageTitle: "React Components"
  };

  changeTitileHandler = newTitle => {
    this.setState({
      pageTitle: newTitle
    });
  };

  handleInput = event => {
    this.setState({
      pageTitle: event.target.value
    });
  };

  render() {
    const divStyle = {
      textAlign: "center"
    };

    // const cars = this.state.cars;

    return (
      <div style={divStyle}>
        <h1>{this.state.pageTitle}</h1>
        <input type="text" onChange={this.handleInput} />
        <button onClick={this.changeTitileHandler.bind(this, "Changed!")}>
          Change title
        </button>

        {this.state.cars.map((car, idx) => (
          <Car
            key={idx}
            name={car.name}
            year={car.year}
            onChangeTitle={this.changeTitileHandler.bind(this, car.name)}
          />
        ))}
      </div>
    );
  }
}

export default App;
