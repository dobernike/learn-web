import React, { Component } from "react";
import "./App.css";
import Car from "./Car/Car";

class App extends Component {
  state = {
    cars: [
      { name: `Ford`, year: `2013` },
      { name: `VW`, year: `1993` },
      { name: `Audi`, year: `2018` }
    ],
    pageTitle: `React components`,
    showCars: true
  };

  onChangeName = (name, idx) => {
    const car = this.state.cars[idx];
    car.name = name;
    const cars = [...this.state.cars];
    cars[idx] = car;

    this.setState({ cars });
  };

  ToggleCarsHandler = () => this.setState({ showCars: !this.state.showCars });

  deleteHandler(idx) {
    const cars = this.state.cars.concat();
    cars.splice(idx, 1);

    this.setState({ cars });
  }

  render() {
    const divStyle = {
      textAlign: "center"
    };

    const cars = this.state.showCars
      ? this.state.cars.map((car, idx) => (
          <Car
            key={idx}
            name={car.name}
            year={car.year}
            onChangeName={event => this.onChangeName(event.target.value, idx)}
            onDelete={this.deleteHandler.bind(this, idx)}
          />
        ))
      : null;

    return (
      <div style={divStyle}>
        {/* <h1>{this.state.pageTitle}</h1> */}
        <h1>{this.props.title}</h1>

        <button className="AppButton" onClick={this.ToggleCarsHandler}>
          Toggle Cars
        </button>

        <div
          style={{
            width: 400,
            margin: `auto`,
            paddingTop: `20px`
          }}
        >
          {cars}
        </div>
      </div>
    );
  }
}

export default App;
