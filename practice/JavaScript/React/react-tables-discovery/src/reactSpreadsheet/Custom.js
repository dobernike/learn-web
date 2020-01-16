import React from "react";
import Spreadsheet from "react-spreadsheet";

const data = [
  [{ value: "Flavors" }],
  [({ value: "Vanilla" }, { value: "Chocolate" })],
  [{ value: "Strawberry" }, { value: "Cookies" }],
  [{ value: "How much do you like ice cream?" }, { value: 100 }]
];

const MyComponent = () => <Spreadsheet data={data} />;
export default MyComponent;
