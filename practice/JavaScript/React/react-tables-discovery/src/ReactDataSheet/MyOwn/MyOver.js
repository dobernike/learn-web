import React, { useState } from "react";
import DataSheet from "react-datasheet";
import * as mathjs from "mathjs";
import Sticky from "@wicked_query/react-sticky";

import "./table2.css";

export default ({ data }) => {
  const [cells, setCells] = useState(data);
  const [offset, setOffset] = useState(0);
  let selectedDiff = { rows: 0, cols: 0 };

  const getCols = cells => [
    ...new Set(Object.values(cells).map(cell => cell.key.charAt(0)))
  ];

  const getRows = cells => [
    ...new Set(Object.values(cells).map(cell => cell.key.slice(1)))
  ];

  const generateGrid = () =>
    getRows(cells).map(row => getCols(cells).map(col => cells[col + row]));

  const validateExp = (trailKeys, expr) => {
    let valid = true;
    const matches = expr.match(/[A-Z][1-9]+/g) || [];

    for (let match of matches) {
      if (trailKeys.indexOf(match) > -1) {
        valid = false;
      } else {
        valid = validateExp([...trailKeys, match], cells[match].expr);
      }
    }

    return valid;
  };

  const computeExpr = (key, expr, scope) => {
    let value = null;

    if (expr.charAt(0) !== "=") {
      const fixedExpr = expr === "" ? (expr = "0.00") : expr.replace(",", ".");

      return { className: "", value: fixedExpr, expr: fixedExpr };
    }

    try {
      value = mathjs.evaluate(expr.substring(1), scope);
    } catch (e) {
      value = null;
    }

    if (value !== null && validateExp([key], expr)) {
      return { value, expr };
    }

    return { className: "error", value: "error", expr: "" };
  };

  const cellUpdate = (copyCells, changeCell, expr) => {
    const scope = Object.fromEntries(
      Object.entries(copyCells).map(([key, { value }]) => [
        key,
        isNaN(value) ? 0 : parseFloat(value)
      ])
    );

    const updatedCell = Object.assign(
      {},
      changeCell,
      computeExpr(changeCell.key, expr, scope)
    );

    copyCells[changeCell.key] = updatedCell;

    Object.values(copyCells).forEach(cell => {
      if (
        cell.expr.charAt(0) === "=" &&
        cell.expr.indexOf(changeCell.key) > -1 &&
        cell.key !== changeCell.key
      ) {
        copyCells = cellUpdate(copyCells, cell, cell.expr);
      }
    });

    return copyCells;
  };

  const handleCellsChanged = changes => {
    const copyCells = { ...cells };

    changes.forEach(({ cell, value }) => {
      cellUpdate(copyCells, cell, value);
    });

    setCells(copyCells);
  };

  const handleSheetRenderer = props => (
    <div className={props.className}>{props.children}</div>
  );

  const handleRowRenderer = props => {
    if (props.children[0].props.cell.className === "top-head") {
      return (
        <Sticky
          subscribe={props => setOffset(props.height)}
          addClassName={"small"}
        >
          <div className="data-row data-row-sticky-top">{props.children}</div>
        </Sticky>
      );
    }

    if (props.children[0].props.cell.className === "bot-head") {
      return (
        <Sticky offset={offset} addClassName={"small"}>
          <div className="data-row data-row-sticky-bot">{props.children}</div>
        </Sticky>
      );
    }

    return <div className="data-row">{props.children}</div>;
  };

  const handleCellRenderer = props => {
    const {
      cell,
      row,
      col,
      attributesRenderer,
      editing,
      updated,
      style,
      ...rest
    } = props;

    return <div {...rest}>{props.children}</div>;
  };

  const grid = generateGrid();

  const handleSelect = ({ start: originStart, end: originEnd }) => {
    const start = { row: originStart.i, col: originStart.j };
    const end = { row: originEnd.i, col: originEnd.j };
    let sumOfCells = 0;
    let count = 0;

    // console.log("start:", start, "end:", end);
    // console.log(
    //   "sRow",
    //   start.row,
    //   "eRow",
    //   end.row,
    //   "sCol",
    //   start.col,
    //   "eCol",
    //   end.col
    // );
    // console.log(
    //   "Diff row:",
    //   Math.max(start.row, end.row),
    //   "-",
    //   Math.min(start.row, end.row),
    //   "=",
    //   Math.max(start.row, end.row) - Math.min(start.row, end.row),
    //   "| Diff col:",
    //   Math.max(start.col, end.col),
    //   "-",
    //   Math.min(start.col, end.col),
    //   "=",
    //   Math.max(start.col, end.col) - Math.min(start.col, end.col)
    // );
    const diffSelected = {
      rows: Math.max(start.row, end.row) - Math.min(start.row, end.row) + 1,
      cols: Math.max(start.col, end.col) - Math.min(start.col, end.col) + 1
    };

    const addCellsToSum = () => {
      sumOfCells += +grid[start.row][start.col].value;
      count++;
    };

    if (start.row <= end.row && start.col === end.col) {
      for (; start.row <= end.row; start.row++) {
        addCellsToSum();
      }
    } else if (start.row >= end.row && start.col === end.col) {
      for (; start.row >= end.row; start.row--) {
        addCellsToSum();
      }
    } else if (start.col <= end.col && start.row === end.row) {
      for (; start.col <= end.col; start.col++) {
        addCellsToSum();
      }
    } else if (start.col >= end.col && start.row === end.row) {
      for (; start.col >= end.col; start.col--) {
        addCellsToSum();
      }
    }

    // else if (start.row >= end.row && start.col >= end.col) {
    //   for (; start.row > end.row; start.row--) {
    //     for (; start.col > end.col; start.col--) {
    //       console.log(grid[start.row][start.col]);
    //       sumOfCol += +grid[start.row][start.col].value;
    //     }
    //   }
    // }

    const middleOfSum = isNaN(sumOfCells / count) ? 0 : sumOfCells / count;
    selectedDiff = diffSelected;
    // console.log(middleOfSum);
  };

  const handleDataRenderer = cell => cell.expr;
  const handleValueRenderer = cell => cell.value;

  const isMultiPasteWithOneParametr = arr =>
    !!(arr[0].length === 1) &&
    !arr[1] &&
    (selectedDiff.rows !== 1 || selectedDiff.cols !== 1);

  const handleParsePaste = str => {
    let arr = str.split(/\r\n|\n|\r/).map(row => row.split("\t"));

    if (isMultiPasteWithOneParametr(arr)) {
      const cols = new Array(selectedDiff.cols).fill(str);
      arr = new Array(selectedDiff.rows).fill(cols);
    }

    return arr;
  };

  return (
    <DataSheet
      data={grid}
      className="custom-sheet"
      sheetRenderer={handleSheetRenderer}
      rowRenderer={handleRowRenderer}
      cellRenderer={handleCellRenderer}
      onCellsChanged={handleCellsChanged}
      dataRenderer={handleDataRenderer}
      valueRenderer={handleValueRenderer}
      onSelect={handleSelect}
      parsePaste={handleParsePaste}
    />
  );
};
