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

const store = {};
export default class MathSheet extends React.Component {
  constructor(props) {
    super(props);
    this.onCellsChanged = this.onCellsChanged.bind(this);
    const state = getDds(COUNT);

    this.state = state;
  }

  generateGrid() {
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
        console.log(this.state[col.key + row], col.key, row);
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
    console.log("state", this.state);
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
