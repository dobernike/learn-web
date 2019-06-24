import React, { Component } from "react";
import "./App.scss";
import About from "./About/About";
import Cars from "./Cars/Cars";
import { Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="nav">
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/about">About</a>
            </li>
          </ul>
        </nav>

        <hr />

        <Route path="/" exact render={() => <h1>Hello</h1>} />
        <About />

        <Cars />
      </div>
    );
  }
}

export default App;
