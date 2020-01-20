import React, { useState } from "react";
import DataSheet from "react-datasheet";
import * as mathjs from "mathjs";

import "./table2.css";

export default ({ data }) => {
  const [cells, setCells] = useState(data);

  const getCols = cells => [
    ...new Set(Object.keys(cells).map(cell => cell.charAt(0)))
  ];

  const getRows = cells =>
    Object.entries(cells)
      .filter(([key], idx) => +key.match(/.(\d+)/)[1] === idx)
      .map(([_, filtredCell]) => filtredCell);

  const generateGrid = () =>
    getRows(cells).map((row, i) =>
      getCols(cells).map((col, j) => {
        if (i === 0 && j === 0) {
          return { readOnly: true, value: row.value, className: row.className };
        }
        if (j === 0) {
          return { readOnly: true, value: row.value, className: row.className };
        }

        return cells[col + row.key];
      })
    );

  const validateExp = (trailKeys, expr) => {
    let valid = true;
    const matches = expr.match(/[A-Z][1-9]+/g) || [];
    matches.map(match => {
      if (trailKeys.indexOf(match) > -1) {
        valid = false;
      } else {
        valid = validateExp([...trailKeys, match], cells[match].expr);
      }
      return undefined;
    });
    return valid;
  };

  const computeExpr = (key, expr, scope) => {
    let value = null;
    if (expr.charAt(0) !== "=") {
      return { className: "", value: expr, expr: expr };
    } else {
      try {
        value = mathjs.evaluate(expr.substring(1), scope);
      } catch (e) {
        value = null;
      }
      if (value !== null && validateExp([key], expr)) {
        return { value, expr };
      } else {
        return { className: "error", value: "error", expr: "" };
      }
    }
  };

  const cellUpdate = (copyCells, changeCell, expr) => {
    if (expr === "") expr = "0.00";

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

  const handleSheetRenderer = props => {
    return <div className={props.className}>{props.children}</div>;
  };

  const handleRowRenderer = props => {
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

  return (
    <DataSheet
      data={generateGrid()}
      className="custom-sheet"
      sheetRenderer={handleSheetRenderer}
      rowRenderer={handleRowRenderer}
      cellRenderer={handleCellRenderer}
      onCellsChanged={handleCellsChanged}
      dataRenderer={cell => cell.expr}
      valueRenderer={cell => cell.value}
    />
  );
};
