import React, { Component } from "react";
import "./App.scss";
import About from "./About/About";
import Cars from "./Cars/Cars";
import { Route, NavLink } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="nav">
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
            <li>
              <NavLink to="/cars">Cars</NavLink>
            </li>
          </ul>
        </nav>

        <hr />

        <Route path="/" exact render={() => <h1>Hello</h1>} />
        <Route path="/about" component={About} />
        <Route path="/cars" component={Cars} />
      </div>
    );
  }
}

export default App;
