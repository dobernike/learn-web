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

  render() {
    const divStyle = {
      textAlign: "center"
    };

    const cars = this.state.cars;

    return (
      <div style={divStyle}>
        <h1>{this.state.pageTitle}</h1>

        <button onClick={this.changeTitileHandler.bind(this, "Changed!")}>
          Change title
        </button>

        <Car
          name={cars[0].name}
          year={cars[0].year}
          onChangeTitle={this.changeTitileHandler.bind(this, cars[0].name)}
        />
        <Car name={cars[1].name} year={cars[1].year}
        onChangeTitle={() => this.changeTitileHandler(cars[1].name)} />
        <Car name={cars[2].name} year={cars[2].year} 
        onChangeTitle={() => this.changeTitileHandler(cars[2].name)}/>
      </div>
    );
  }
}

export default App;
