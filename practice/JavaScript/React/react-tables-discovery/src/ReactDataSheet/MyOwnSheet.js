import React from "react";
import _ from "lodash";
import * as mathjs from "mathjs";
import Datasheet from "react-datasheet";
import "./styles.css";
import getDds from "../mock/dds";

const COUNT = 120;

const alphabet_original = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".repeat(100);
const alphabet = alphabet_original.slice(0, COUNT);

const initial = {
  A1: { key: "A1", value: "200", expr: "" },
  A2: { key: "A2", value: "300", expr: "" },
  A3: { key: "A3", value: "500", expr: "=A1+A2" },
  A4: { key: "A4", value: "500", expr: "=A1+A2" },
  B1: { key: "B1", value: "500", expr: "=A1+A2" },
  B2: { key: "B2", value: "500", expr: "=A1+A2" },
  B3: { key: "B3", value: "500", expr: "=A1+A2" },
  B4: { key: "B4", value: "500", expr: "=A1+A2" },
  C1: { key: "C1", value: "500", expr: "=A1+A2" },
  C2: { key: "C2", value: "500", expr: "=A1+A2" },
  C3: { key: "C3", value: "500", expr: "=A1+A2" },
  C4: { key: "C4", value: "500", expr: "=A1+A2" },
  D1: { key: "D1", value: "500", expr: "=A1+A2" },
  D2: { key: "D2", value: "500", expr: "=A1+A2" },
  D3: { key: "D3", value: "500", expr: "=A1+A2" },
  D4: { key: "D4", value: "500", expr: "=A1+A2" }
};

export default class MathSheet extends React.Component {
  constructor(props) {
    super(props);
    this.onCellsChanged = this.onCellsChanged.bind(this);
    const state = getDds(COUNT);
    console.log(state, initial);

    this.state = state;
  }

  generateGrid() {
    // ...Array(COUNT + 1).keys()
    // alphabet.split("")
    console.log(["", ...alphabet.split("")], ["", "A", "B", "C", "D"]);
    return [...Array(COUNT + 1).keys()].map((row, i) =>
      ["", ...alphabet.split("")].map((col, j) => {
        if (i === 0 && j === 0) {
          return { readOnly: true, value: "" };
        }
        if (row === 0) {
          return { readOnly: true, value: col };
        }
        if (j === 0) {
          return { readOnly: true, value: row };
        }
        return this.state[col + row];
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

  cellUpdate(state, changeCell, expr) {
    const scope = _.mapValues(state, val =>
      isNaN(val.value) ? 0 : parseFloat(val.value)
    );
    const updatedCell = _.assign(
      {},
      changeCell,
      this.computeExpr(changeCell.key, expr, scope)
    );
    state[changeCell.key] = updatedCell;

    _.each(state, (cell, key) => {
      if (
        cell.expr.charAt(0) === "=" &&
        cell.expr.indexOf(changeCell.key) > -1 &&
        key !== changeCell.key
      ) {
        state = this.cellUpdate(state, cell, cell.expr);
      }
    });
    return state;
  }

  onCellsChanged(changes) {
    const state = _.assign({}, this.state);
    changes.forEach(({ cell, value }) => {
      this.cellUpdate(state, cell, value);
    });
    this.setState(state);
  }

  render() {
    return (
      <Datasheet
        data={this.generateGrid()}
        valueRenderer={cell => cell.value}
        dataRenderer={cell => cell.expr}
        onCellsChanged={this.onCellsChanged}
      />
    );
  }
}
