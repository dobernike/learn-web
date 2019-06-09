import React, { Component } from "react";
import "./App.css";
import Car from "./Car/Car";

class App extends Component {
  render() {
    const divStyle = {
      textAlign: "center"
    };

    return (
      <div style={divStyle}>
        <h1>hello again</h1>

        <Car name={"Ford"} year={2013}>
          <p style={{color: 'blue'}}>COLOR</p>
        </Car>
        <Car name="Vw" year="1993">
        <p style={{color: 'red'}}>COLOR</p>
        </Car>
        <Car name={"Audi"} year={"2018"} />
      </div>
    );
  }
}

export default App;
