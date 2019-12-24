import React from "react";
import Spreadsheet from "react-spreadsheet";

const RangeView = ({ cell, getValue }) => (
  <input
    type="range"
    value={getValue({ data: cell })}
    disabled
    style={{ pointerEvents: "none" }}
  />
);

const RangeEdit = ({ getValue, cell, onChange }) => (
  <input
    type="range"
    onChange={e => {
      onChange({ ...cell, value: e.target.value });
    }}
    value={getValue({ data: cell }) || 0}
    autoFocus
  />
);

const data = [
  [{ value: "Flavors" }],
  [({ value: "Vanilla" }, { value: "Chocolate" })],
  [{ value: "Strawberry" }, { value: "Cookies" }],
  [
    { value: "How much do you like ice cream?" },
    { value: 100, DataViewer: RangeView, DataEditor: RangeEdit }
  ]
];

const MyComponent = () => <Spreadsheet data={data} />;
export default MyComponent;
