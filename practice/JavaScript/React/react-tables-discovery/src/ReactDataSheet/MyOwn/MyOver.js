import React, { useState } from "react";
import DataSheet from "react-datasheet";
import * as mathjs from "mathjs";
// import Sticky from "react-sticky";
import Sticky from "@wicked_query/react-sticky";

import "./table2.css";

export default ({ data }) => {
  const [cells, setCells] = useState(data);
  const [offset, setOffset] = useState(0);

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
