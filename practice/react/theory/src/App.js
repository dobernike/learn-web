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
    pageTitle: "React Components",
    showCars: false
  };

  changeTitileHandler = pageTitle => {
    this.setState({ pageTitle });
  };

  toggleCarsHandler = () => {
    this.setState({
      showCars: !this.state.showCars
    });
  };

  render() {
    const divStyle = {
      textAlign: "center"
    };

    let cars = null;

    if (this.state.showCars) {
      cars = this.state.cars.map((car, idx) => (
        <Car
          key={idx}
          name={car.name}
          year={car.year}
          onChangeTitle={this.changeTitileHandler.bind(this, car.name)}
        />
      ));
    }

    return (
      <div style={divStyle}>
        <h1>{this.state.pageTitle}</h1>

        <button onClick={this.toggleCarsHandler}>Toggle cars</button>

        {cars}
      </div>
    );
  }
}

export default App;
