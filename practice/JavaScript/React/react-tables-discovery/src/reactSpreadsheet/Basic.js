import React from "react";
import Spreadsheet from "react-spreadsheet";

const data = [
  [{ value: "Vanilla" }, { value: "Chocolate" }],
  [{ value: "Strawberry" }, { value: "Cookies" }]
];

const MyComponent = () => <Spreadsheet data={data} />;
export default MyComponent;
