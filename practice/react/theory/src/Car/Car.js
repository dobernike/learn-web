import React from "react";
// import Radium from 'radium';
import "./Car.css";

const Car = props => {
  const inputClasses = [`input`];

  if (props.name !== ``) {
    inputClasses.push(`green`);
  } else {
    inputClasses.push(`red`);
  }

  if (props.name.length > 3) {
    inputClasses.push(`bold`);
  }

  // const style = {

  // };

  return (
    <div className="Car">
      <h3>Car name is: {props.name}</h3>
      <p>
        Year:
        <strong>{props.year}</strong>
      </p>
      <input
        className={inputClasses.join(` `)}
        type="text"
        onChange={props.onChangeName}
        value={props.name}
      />
      <button onClick={props.onDelete}>Delete</button>
    </div>
  );
};

// export default Radium(Car);
export default Car;
