import React, { useState, useCallback, useMemo } from "react";
import DataSheet from "react-datasheet";
import { evaluate } from "mathjs";
import Sticky from "@wicked_query/react-sticky";

import "./table2.css";

export default ({ data }) => {
  const [cells, setCells] = useState(data.table);
  const [comment, setComment] = useState(data.comment);
  const [offset, setOffset] = useState(0);
  const [isEmptyRowsHide, setIsEmptyRowsHide] = useState(false);
  const [isReadOnly, setIsReadOnly] = useState(false);

  let selectedDiff = { rows: 0, cols: 0 };
  let middleOfSum = "";

  const cols = useMemo(
    () => [...new Set(Object.values(cells).map(cell => cell.key.charAt(0)))],
    []
  );

  const rows = useMemo(
    () => [...new Set(Object.values(cells).map(cell => cell.key.slice(1)))],
    []
  );

  const generateGrid = () =>
    rows.map(row =>
      cols.map(col =>
        isReadOnly
          ? { ...cells[col + row], readOnly: true }
          : { ...cells[col + row] }
      )
    );

  const grid = generateGrid();

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

    const toFixed = number =>
      parseFloat(number)
        .toFixed(2)
        .replace(/(\d)(?=(\d{3})+([^\d]|$))/g, "$1 ");

    if (expr.charAt(0) !== "=") {
      expr = isNaN(expr) || expr === "" ? "0.00" : expr.replace(",", ".");
      value = toFixed(expr);

      const className = expr < 0 ? "value-error" : "";

      return { className, value, expr };
    }

    try {
      value = evaluate(expr.substring(1), scope);
    } catch {
      value = null;
    }

    if (value !== null && validateExp([key], expr)) {
      value = toFixed(value);

      return { value, expr };
    }

    return { className: "error", value: "error", expr: "" };
  };

  const cellUpdate = (copyCells, changeCell, expr) => {
    const scope = Object.fromEntries(
      Object.entries(copyCells).map(([key, { value }]) => {
        const parsedValue = parseFloat(value.replace(/\s/g, ""));

        return [key, isNaN(parsedValue) ? 0.0 : parsedValue];
      })
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

  const handleSheetRenderer = useCallback(
    props => <div className={props.className}>{props.children}</div>,
    []
  );

  const handleRowRenderer = useCallback(
    props => {
      if (props.children[0].props.cell.className === "top-head") {
        return (
          <Sticky subscribe={props => setOffset(props.height)}>
            <div className="data-row data-row-sticky data-row-sticky__top">
              {props.children}
            </div>
          </Sticky>
        );
      }

      if (props.children[0].props.cell.className === "bot-head") {
        return (
          <Sticky offset={offset}>
            <div className="data-row data-row-sticky">{props.children}</div>
          </Sticky>
        );
      }

      if (isEmptyRowsHide) {
        let count = 0;
        let empty = 0;

        React.Children.forEach(props.children, child => {
          const value = child.props.cell.value;
          const expr = child.props.cell.expr;

          if (isNaN(value)) return;

          count += 1;

          if (value === "0.00" && expr === "") {
            empty += 1;
          }
        });

        if (count === empty) return <div />;
      }

      return <div className="data-row">{props.children}</div>;
    },
    [offset, isEmptyRowsHide]
  );

  const handleCellRenderer = useCallback(props => {
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
  }, []);

  const handleSelect = ({ start: originStart, end: originEnd }) => {
    const start = { row: originStart.i, col: originStart.j };
    const end = { row: originEnd.i, col: originEnd.j };
    let sumOfCells = 0;
    let count = 0;

    const addCellsToSum = (row, col) => {
      sumOfCells += +grid[row][col].value;
      count++;
    };

    if (start.row <= end.row && start.col === end.col) {
      for (let row = start.row; row <= end.row; row++) {
        addCellsToSum(row, start.col);
      }
    }

    if (start.row > end.row && start.col === end.col) {
      for (let row = start.row; row >= end.row; row--) {
        addCellsToSum(row, start.col);
      }
    }

    if (start.col < end.col && start.row === end.row) {
      for (let col = start.col; col <= end.col; col++) {
        addCellsToSum(start.row, col);
      }
    }

    if (start.col > end.col && start.row === end.row) {
      for (let col = start.col; col >= end.col; col--) {
        addCellsToSum(start.row, col);
      }
    }

    const diffSelected = {
      rows: Math.max(start.row, end.row) - Math.min(start.row, end.row) + 1,
      cols: Math.max(start.col, end.col) - Math.min(start.col, end.col) + 1
    };

    selectedDiff = diffSelected;

    middleOfSum = isNaN(sumOfCells / count)
      ? "Неверные данные"
      : sumOfCells / count;
  };

  const handleDataRenderer = useCallback(cell => cell.expr, []);
  const handleValueRenderer = useCallback(cell => cell.value, []);

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

  const handleEmpty = () => setIsEmptyRowsHide(prev => !prev);
  const handleClear = () => {};
  const handleReadOnly = () => setIsReadOnly(prev => !prev);

  return (
    <>
      <button onClick={handleEmpty}>Empty</button>
      <button onClick={handleClear}>Clear</button>
      <button onClick={handleReadOnly}>ReadOnly</button>

      <h2 style={{ textAlign: "left", marginBottom: "4rem" }}>
        Движение денежных средств
      </h2>
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
      <Comment comment={comment} />
    </>
  );
};

const Comment = ({ comment }) => (
  <div className="comment__wrapper">
    <div className="comment__title">{comment.title}</div>
    <textarea
      className="comment__text"
      type="text"
      defaultValue={comment.text}
    />
  </div>
);
