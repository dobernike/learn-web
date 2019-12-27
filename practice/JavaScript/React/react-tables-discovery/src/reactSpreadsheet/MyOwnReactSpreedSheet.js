import React from "react";
import Spreadsheet from "react-spreadsheet";

const data = [
  [{ value: "Vanilla" }, { value: "Vanilla", expr: "=A1" }],
  [{ value: "Strawberry" }, { value: "Cookies" }]
];

const MyComponent = () => (
  <Spreadsheet
    data={data}
    dataRenderer={(cell, i, j) =>
      j == 2 ? cell.value.toISOString() : cell.expr
    }
  />
);
export default MyComponent;
