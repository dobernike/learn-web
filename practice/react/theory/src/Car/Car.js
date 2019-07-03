import React from "react";

export default props => (
  <h2>
    <p>Car name is: {props.name}</p>
    <p>
      Year:
      <strong>{props.year}</strong>
    </p>
    <input type="text" onChange={props.onChangeName} value={props.name} />
    {/* <button onClick={props.onChangeTitle}>Click</button> */}
  </h2>
);
