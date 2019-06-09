import React from "react";

export default props => (
  <h2>
    <p>Car name is: {props.name}</p>
    <p>
      Year:
      <strong>{props.year}</strong>
      {props.children}
    </p>
  </h2>
);
