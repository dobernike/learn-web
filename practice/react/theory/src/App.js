import React, { Component } from "react";
import "./App.css";

class App extends Component {
  render() {
    const divStyle = {
     textAlign: "center"
    };

    return (
      <div style={divStyle}>
        <h1 style={{color: 'blue', fontSize: '20px'}}>hello again</h1>
      </div>
    );

    //   return React.createElement(
    //     "div",
    //     {
    //       className: 'App'
    //     },
    //     React.createElement("h1", null, "Hello again")
    //   );
  }
}

export default App;
