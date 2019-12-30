import React from "react";
import _ from "lodash";
import * as mathjs from "mathjs";
import Datasheet from "react-datasheet";
import "./styles.css";
import getDds from "../mock/dds";

const COUNT = 13;

const alphabet_original = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".repeat(100);
const alphabet = alphabet_original.slice(0, COUNT);
const mounth = [
  { key: "A", value: "Наименование" },
  { key: "B", value: "Январь" },
  { key: "C", value: "Февраль" },
  { key: "D", value: "Март" },
  { key: "E", value: "Апрель" },
  { key: "F", value: "Май" },
  { key: "G", value: "Июнь" },
  { key: "H", value: "Июль" },
  { key: "I", value: "Август" },
  { key: "J", value: "Сентябрь" },
  { key: "K", value: "Октябрь" },
  { key: "L", value: "Ноябрь" },
  { key: "M", value: "Декабрь" }
];

const alpha = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];

const store = [
  [
    { readOnly: true, value: "#" },
    { readOnly: true, value: "Наименование" },
    { readOnly: true, value: "Январь" },
    { readOnly: true, value: "Февраль" },
    { readOnly: true, value: "Март" },
    { readOnly: true, value: "Апрель" },
    { readOnly: true, value: "Май" },
    { readOnly: true, value: "Июнь" },
    { readOnly: true, value: "Июль" },
    { readOnly: true, value: "Август" },
    { readOnly: true, value: "Сентябрь" },
    { readOnly: true, value: "Октябрь" },
    { readOnly: true, value: "Ноябрь" },
    { readOnly: true, value: "Декабрь" }
  ],
  [
    { readOnly: true, value: 1 },
    { key: "A1", value: "200", expr: "" },
    { key: "B1", value: "500", expr: "" },
    { key: "C1", value: "500", expr: "" },
    { key: "D1", value: "500", expr: "" },
    { key: "E1", value: "500", expr: "" },
    { key: "F1", value: "500", expr: "" },
    { key: "G1", value: "500", expr: "" },
    { key: "H1", value: "500", expr: "" },
    { key: "I1", value: "500", expr: "" },
    { key: "J1", value: "500", expr: "" },
    { key: "K1", value: "500", expr: "" },
    { key: "L1", value: "500", expr: "" },
    { key: "M1", value: "500", expr: "" }
  ],
  [
    { readOnly: true, value: 2 },
    { key: "A2", value: "300", expr: "" },
    { key: "B2", value: "500", expr: "" },
    { key: "C2", value: "500", expr: "" },
    { key: "D2", value: "500", expr: "" },
    { key: "E2", value: "500", expr: "" },
    { key: "F2", value: "500", expr: "" },
    { key: "G2", value: "500", expr: "" },
    { key: "H2", value: "500", expr: "" },
    { key: "I2", value: "500", expr: "" },
    { key: "J2", value: "500", expr: "" },
    { key: "K2", value: "500", expr: "" },
    { key: "L2", value: "500", expr: "" },
    { key: "M2", value: "500", expr: "" }
  ],
  [
    { readOnly: true, value: 3 },
    { key: "A3", value: "500", expr: "=A1+A2" },
    { key: "B3", value: "500", expr: "=A1+A2" },
    { key: "C3", value: "500", expr: "=A1+A2" },
    { key: "D3", value: "500", expr: "=A1+A2" },
    { key: "E3", value: "500", expr: "=A1+A2" },
    { key: "F3", value: "500", expr: "=A1+A2" },
    { key: "G3", value: "500", expr: "=A1+A2" },
    { key: "H3", value: "500", expr: "=A1+A2" },
    { key: "I3", value: "500", expr: "=A1+A2" },
    { key: "J3", value: "500", expr: "=A1+A2" },
    { key: "K3", value: "500", expr: "=A1+A2" },
    { key: "L3", value: "500", expr: "=A1+A2" },
    { key: "M3", value: "500", expr: "=A1+A2" }
  ],
  [
    { readOnly: true, value: 4 },
    { key: "A4", value: "500", expr: "" },
    { key: "B4", value: "500", expr: "" },
    { key: "C4", value: "500", expr: "" },
    { key: "D4", value: "500", expr: "" },
    { key: "E4", value: "500", expr: "" },
    { key: "F4", value: "500", expr: "" },
    { key: "G4", value: "500", expr: "" },
    { key: "H4", value: "500", expr: "" },
    { key: "I4", value: "500", expr: "" },
    { key: "J4", value: "500", expr: "" },
    { key: "K4", value: "500", expr: "" },
    { key: "L4", value: "500", expr: "" },
    { key: "M4", value: "500", expr: "" }
  ],
  [
    { readOnly: true, value: 5 },
    { key: "A5", value: "500", expr: "" },
    { key: "B5", value: "500", expr: "" },
    { key: "C5", value: "500", expr: "" },
    { key: "D5", value: "500", expr: "" },
    { key: "E5", value: "500", expr: "" },
    { key: "F5", value: "500", expr: "" },
    { key: "G5", value: "500", expr: "" },
    { key: "H5", value: "500", expr: "" },
    { key: "I5", value: "500", expr: "" },
    { key: "J5", value: "500", expr: "" },
    { key: "K5", value: "500", expr: "" },
    { key: "L5", value: "500", expr: "" },
    { key: "M5", value: "500", expr: "" }
  ],
  [
    { readOnly: true, value: 6 },
    { key: "A6", value: "500", expr: "=A1+A2" },
    { key: "B6", value: "500", expr: "=A1+A2" },
    { key: "C6", value: "500", expr: "=A1+A2" },
    { key: "D6", value: "500", expr: "=A1+A2" },
    { key: "E6", value: "500", expr: "=A1+A2" },
    { key: "F6", value: "500", expr: "=A1+A2" },
    { key: "G6", value: "500", expr: "=A1+A2" },
    { key: "H6", value: "500", expr: "=A1+A2" },
    { key: "I6", value: "500", expr: "=A1+A2" },
    { key: "J6", value: "500", expr: "=A1+A2" },
    { key: "K6", value: "500", expr: "=A1+A2" },
    { key: "L6", value: "500", expr: "=A1+A2" },
    { key: "M6", value: "500", expr: "=A1+A2" }
  ],
  [
    { readOnly: true, value: 7 },
    { key: "A7", value: "500", expr: "" },
    { key: "B7", value: "500", expr: "" },
    { key: "C7", value: "500", expr: "" },
    { key: "D7", value: "500", expr: "" },
    { key: "E7", value: "500", expr: "" },
    { key: "F7", value: "500", expr: "" },
    { key: "G7", value: "500", expr: "" },
    { key: "H7", value: "500", expr: "" },
    { key: "I7", value: "500", expr: "" },
    { key: "J7", value: "500", expr: "" },
    { key: "K7", value: "500", expr: "" },
    { key: "L7", value: "500", expr: "" },
    { key: "M7", value: "500", expr: "" }
  ],
  [
    { readOnly: true, value: 8 },
    { key: "A8", value: "500", expr: "" },
    { key: "B8", value: "500", expr: "" },
    { key: "C8", value: "500", expr: "" },
    { key: "D8", value: "500", expr: "" },
    { key: "E8", value: "500", expr: "" },
    { key: "F8", value: "500", expr: "" },
    { key: "G8", value: "500", expr: "" },
    { key: "H8", value: "500", expr: "" },
    { key: "I8", value: "500", expr: "" },
    { key: "J8", value: "500", expr: "" },
    { key: "K8", value: "500", expr: "" },
    { key: "L8", value: "500", expr: "" },
    { key: "M8", value: "500", expr: "" }
  ],
  [
    { readOnly: true, value: 9 },
    { key: "A9", value: "500", expr: "=A1+A2" },
    { key: "B9", value: "500", expr: "=A1+A2" },
    { key: "C9", value: "500", expr: "=A1+A2" },
    { key: "D9", value: "500", expr: "=A1+A2" },
    { key: "E9", value: "500", expr: "=A1+A2" },
    { key: "F9", value: "500", expr: "=A1+A2" },
    { key: "G9", value: "500", expr: "=A1+A2" },
    { key: "H9", value: "500", expr: "=A1+A2" },
    { key: "I9", value: "500", expr: "=A1+A2" },
    { key: "J9", value: "500", expr: "=A1+A2" },
    { key: "K9", value: "500", expr: "=A1+A2" },
    { key: "L9", value: "500", expr: "=A1+A2" },
    { key: "M9", value: "500", expr: "=A1+A2" }
  ],
  [
    { readOnly: true, value: 10 },
    { key: "A10", value: "500", expr: "" },
    { key: "B10", value: "500", expr: "" },
    { key: "C10", value: "500", expr: "" },
    { key: "D10", value: "500", expr: "" },
    { key: "E10", value: "500", expr: "" },
    { key: "F10", value: "500", expr: "" },
    { key: "G10", value: "500", expr: "" },
    { key: "H10", value: "500", expr: "" },
    { key: "I10", value: "500", expr: "" },
    { key: "J10", value: "500", expr: "" },
    { key: "K10", value: "500", expr: "" },
    { key: "L10", value: "500", expr: "" },
    { key: "M10", value: "500", expr: "" }
  ],
  [
    { readOnly: true, value: 11 },
    { key: "A11", value: "500", expr: "" },
    { key: "B11", value: "500", expr: "" },
    { key: "C11", value: "500", expr: "" },
    { key: "D11", value: "500", expr: "" },
    { key: "E11", value: "500", expr: "" },
    { key: "F11", value: "500", expr: "" },
    { key: "G11", value: "500", expr: "" },
    { key: "H11", value: "500", expr: "" },
    { key: "I11", value: "500", expr: "" },
    { key: "J11", value: "500", expr: "" },
    { key: "K11", value: "500", expr: "" },
    { key: "L11", value: "500", expr: "" },
    { key: "M11", value: "500", expr: "" }
  ],
  [
    { readOnly: true, value: 12 },
    { key: "A12", value: "500", expr: "=A1+A2" },
    { key: "B12", value: "500", expr: "=A1+A2" },
    { key: "C12", value: "500", expr: "=A1+A2" },
    { key: "D12", value: "500", expr: "=A1+A2" },
    { key: "E12", value: "500", expr: "=A1+A2" },
    { key: "F12", value: "500", expr: "=A1+A2" },
    { key: "G12", value: "500", expr: "=A1+A2" },
    { key: "H12", value: "500", expr: "=A1+A2" },
    { key: "I12", value: "500", expr: "=A1+A2" },
    { key: "J12", value: "500", expr: "=A1+A2" },
    { key: "K12", value: "500", expr: "=A1+A2" },
    { key: "L12", value: "500", expr: "=A1+A2" },
    { key: "M12", value: "500", expr: "=A1+A2" }
  ],
  [
    { readOnly: true, value: 13 },
    { key: "A13", value: "500", expr: "" },
    { key: "B13", value: "500", expr: "" },
    { key: "C13", value: "500", expr: "" },
    { key: "D13", value: "500", expr: "" },
    { key: "E13", value: "500", expr: "" },
    { key: "F13", value: "500", expr: "" },
    { key: "G13", value: "500", expr: "" },
    { key: "H13", value: "500", expr: "" },
    { key: "I13", value: "500", expr: "" },
    { key: "J13", value: "500", expr: "" },
    { key: "K13", value: "500", expr: "" },
    { key: "L13", value: "500", expr: "" },
    { key: "M13", value: "500", expr: "" }
  ]
];

// const state = getDds(COUNT);
const state = { store };

export default class MathSheet extends React.Component {
  constructor(props) {
    super(props);
    this.onCellsChanged = this.onCellsChanged.bind(this);

    this.state = state;
  }

  generateGrid() {
    // return this.state;
    return [...Array(COUNT + 1).keys()].map((row, i) =>
      ["#", ...mounth].map((col, j) => {
        if (i === 0 && j === 0) {
          return { readOnly: true, value: col };
        }
        if (row === 0) {
          // console.log(col.value);
          return { readOnly: true, value: col.value };
        }
        if (j === 0) {
          return { readOnly: true, value: row };
        }
        // console.log(this.state[col.key + row], col.key, row);
        return this.state[col.key + row];
      })
    );
  }

  validateExp(trailKeys, expr) {
    let valid = true;
    const matches = expr.match(/[A-Z][1-9]+/g) || [];
    matches.map(match => {
      if (trailKeys.indexOf(match) > -1) {
        valid = false;
      } else {
        valid = this.validateExp([...trailKeys, match], this.state[match].expr);
      }
      return undefined;
    });
    return valid;
  }

  computeExpr(key, expr, scope) {
    let value = null;
    if (expr.charAt(0) !== "=") {
      return { className: "", value: expr, expr: expr };
    } else {
      try {
        value = mathjs.evaluate(expr.substring(1), scope);
      } catch (e) {
        value = null;
      }

      if (value !== null && this.validateExp([key], expr)) {
        return { className: "equation", value, expr };
      } else {
        return { className: "error", value: "error", expr: "" };
      }
    }
  }

  cellUpdate(state, changeCell, expr, row, col) {
    // other
    state.store[row][col].value = expr;
    state.store[row][col].expr = expr;
    // ----

    // const scope = _.mapValues(state, val =>
    //   isNaN(val.value) ? 0 : parseFloat(val.value)
    // );
    // const updatedCell = _.assign(
    //   {},
    //   changeCell,
    //   this.computeExpr(changeCell.key, expr, scope)
    // );
    // state[changeCell.key] = updatedCell;

    // _.each(state, (cell, key) => {
    //   if (
    //     cell.expr.charAt(0) === "=" &&
    //     cell.expr.indexOf(changeCell.key) > -1 &&
    //     key !== changeCell.key
    //   ) {
    //     state = this.cellUpdate(state, cell, cell.expr);
    //   }
    // });
    return state;
  }

  onCellsChanged(changes) {
    console.log(changes);
    const state = Object.assign({}, this.state);
    changes.forEach(({ cell, value, row, col }) => {
      this.cellUpdate(state, cell, value, row, col);
    });
    this.setState({ ...this.state, store: state.store });
    console.log(state);
  }

  render() {
    // const data = this.state.store;
    // const data2 = getDds(COUNT);
    // console.log("state", this.state, "func", this.generateGrid());
    return (
      <Datasheet
        data={this.state.store}
        valueRenderer={cell => cell.value}
        dataRenderer={cell => cell.expr}
        onCellsChanged={this.onCellsChanged}
      />
    );
  }
}
