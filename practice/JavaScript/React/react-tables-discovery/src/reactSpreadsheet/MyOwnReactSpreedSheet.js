import React from "react";
import Spreadsheet from "react-spreadsheet";

const data = [
  [{ value: "0" }, { value: "=A1" }],
  [{ value: "Strawberry" }, { value: "Cookies" }]
];

const MyComponent = () => <Spreadsheet data={data} />;
export default MyComponent;
