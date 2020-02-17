import React from "react";
import _ from "lodash";
import * as mathjs from "mathjs";
import Datasheet from "react-datasheet";
import "../react-datasheet.css";
import "../table2.css";
import "../styles.css";

export default class MathSheet extends React.Component {
  state = { ...this.props.data.table };
  listRef = React.createRef();

  getSnapshotBeforeUpdate(prevProps, prevState) {
    // Добавляются ли в список новые элементы?
    // Запоминаем значение прокрутки, чтобы использовать его позже.
    // if (prevProps.list.length < this.props.list.length) {
    const list = this.listRef.current;
    const top = document.body.offsetTop;
    const left = document.body.offsetLeft;
    console.log(list, top, left);
    return null;
    return list.scrollHeight - list.scrollTop;
    // }
    // return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // Если снимок (snapshot) передан, значит элементы добавлены.
    // Выравниваем прокрутку так, чтобы новые элементы не выталкивали старые.
    // (снимок – значение, переданное из getSnapshotBeforeUpdate)
    console.log(snapshot);
    if (snapshot !== null) {
      const list = this.listRef.current;
      list.scrollTop = list.scrollHeight - snapshot;
    }
  }

  cols = [
    ...new Set(Object.values(this.state).map(cell => cell.key.charAt(0)))
  ];

  rows = [...new Set(Object.values(this.state).map(cell => cell.key.slice(1)))];

  grid = () =>
    this.rows.map(row =>
      this.cols.map(col => ({
        ...this.state[col + row]
      }))
    );

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
    // changes.forEach(({ cell, value }) => {
    //   this.cellUpdate(state, cell, value);
    // });
    this.setState(state);
  }

  render() {
    // console.log(this.props.data.table);
    return (
      <div ref={this.listRef}>
        <Datasheet
          data={this.grid()}
          className="custom-sheet"
          valueRenderer={cell => cell.value}
          dataRenderer={cell => cell.expr}
          // onCellsChanged={this.onCellsChanged}
        />
      </div>
    );
  }
}
