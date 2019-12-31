import React, { useState } from "react";
import * as mathjs from "mathjs";
import Datasheet from "react-datasheet";

const fetchCells = {
  "00": { key: "0", value: "name", readOnly: true, expr: "" },
  "01": { key: "1", value: "one", readOnly: true, expr: "" },
  "02": { key: "2", value: "two", readOnly: true, expr: "" },
  "03": { key: "3", value: "three", readOnly: true, expr: "" },
  "04": { key: "4", value: "four", readOnly: true, expr: "" },
  "05": { key: "5", value: "five", readOnly: true, expr: "" },
  "06": { key: "6", value: "six", readOnly: true, expr: "" },
  "07": { key: "7", value: "seven", readOnly: true, expr: "" },
  "08": { key: "8", value: "eight", readOnly: true, expr: "" },
  "09": { key: "9", value: "nine", readOnly: true, expr: "" },
  "010": { key: "10", value: "ten", readOnly: true, expr: "" },
  "011": { key: "11", value: "eleven", readOnly: true, expr: "" },
  "012": { key: "12", value: "twelve", readOnly: true, expr: "" },
  "013": { key: "13", value: "therteen", readOnly: true, expr: "" },
  "014": { key: "14", value: "fourteen", readOnly: true, expr: "" },
  "015": { key: "15", value: "fivteen", readOnly: true, expr: "" },
  A0: { key: "A0", value: "January", readOnly: true, expr: "" },
  A1: { key: "A1", value: "200", expr: "" },
  A2: {
    key: "A2",
    value: "200",
    expr: "=A1",
    readOnly: true
  },
  A3: { key: "A3", value: "", expr: "=A1+A2" },
  A4: { key: "A4", value: "", expr: "=A2+A3" },
  A5: { key: "A5", value: "", expr: "=A3+A4" },
  A6: { key: "A6", value: "", expr: "=A4+A5" },
  A7: { key: "A7", value: "", expr: "" },
  A8: { key: "A8", value: "", expr: "" },
  A9: { key: "A9", value: "", expr: "" },
  A10: { key: "A10", value: "", expr: "" },
  A11: { key: "A11", value: "", expr: "" },
  A12: { key: "A12", value: "", expr: "" },
  A13: { key: "A13", value: "", expr: "" },
  A14: { key: "A14", value: "", expr: "" },
  A15: { key: "A15", value: "", expr: "" },
  B0: { key: "B0", value: "February", readOnly: true, expr: "" },
  B1: { key: "B1", value: "", expr: "" },
  B2: { key: "B2", value: "", expr: "" },
  B3: { key: "B3", value: "", expr: "" },
  B4: { key: "B4", value: "", expr: "" },
  B5: { key: "B5", value: "", expr: "" },
  B6: { key: "B6", value: "", expr: "" },
  B7: { key: "B7", value: "", expr: "" },
  B8: { key: "B8", value: "", expr: "" },
  B9: { key: "B9", value: "", expr: "" },
  B10: { key: "B10", value: "", expr: "" },
  B11: { key: "B11", value: "", expr: "" },
  B12: { key: "B12", value: "", expr: "" },
  B13: { key: "B13", value: "", expr: "" },
  B14: { key: "B14", value: "", expr: "" },
  B15: { key: "B15", value: "", expr: "" },
  C0: { key: "C0", value: "March", readOnly: true, expr: "" },
  C1: { key: "C1", value: "", expr: "" },
  C2: { key: "C2", value: "", expr: "" },
  C3: { key: "C3", value: "", expr: "" },
  C4: { key: "C4", value: "", expr: "" },
  C5: { key: "C5", value: "", expr: "" },
  C6: { key: "C6", value: "", expr: "" },
  C7: { key: "C7", value: "", expr: "" },
  C8: { key: "C8", value: "", expr: "" },
  C9: { key: "C9", value: "", expr: "" },
  C10: { key: "C10", value: "", expr: "" },
  C11: { key: "C11", value: "", expr: "" },
  C12: { key: "C12", value: "", expr: "" },
  C13: { key: "C13", value: "", expr: "" },
  C14: { key: "C14", value: "", expr: "" },
  C15: { key: "C15", value: "", expr: "" },
  D0: { key: "D0", value: "April", readOnly: true, expr: "" },
  D1: { key: "D1", value: "", expr: "" },
  D2: { key: "D2", value: "", expr: "" },
  D3: { key: "D3", value: "", expr: "" },
  D4: { key: "D4", value: "", expr: "" },
  D5: { key: "D5", value: "", expr: "" },
  D6: { key: "D6", value: "", expr: "" },
  D7: { key: "D7", value: "", expr: "" },
  D8: { key: "D8", value: "", expr: "" },
  D9: { key: "D9", value: "", expr: "" },
  D10: { key: "D10", value: "", expr: "" },
  D11: { key: "D11", value: "", expr: "" },
  D12: { key: "D12", value: "", expr: "" },
  D13: { key: "D13", value: "", expr: "" },
  D14: { key: "D14", value: "", expr: "" },
  D15: { key: "D15", value: "", expr: "" },
  E0: { key: "E0", value: "April", readOnly: true, expr: "" },
  E1: { key: "E1", value: "", expr: "" },
  E2: { key: "E2", value: "", expr: "" },
  E3: { key: "E3", value: "", expr: "" },
  E4: { key: "E4", value: "", expr: "" },
  E5: { key: "E5", value: "", expr: "" },
  E6: { key: "E6", value: "", expr: "" },
  E7: { key: "E7", value: "", expr: "" },
  E8: { key: "E8", value: "", expr: "" },
  E9: { key: "E9", value: "", expr: "" },
  E10: { key: "E10", value: "", expr: "" },
  E11: { key: "E11", value: "", expr: "" },
  E12: { key: "E12", value: "", expr: "" },
  E13: { key: "E13", value: "", expr: "" },
  E14: { key: "E14", value: "", expr: "" },
  E15: { key: "E15", value: "", expr: "" },
  F0: { key: "F0", value: "April", readOnly: true, expr: "" },
  F1: { key: "F1", value: "", expr: "" },
  F2: { key: "F2", value: "", expr: "" },
  F3: { key: "F3", value: "", expr: "" },
  F4: { key: "F4", value: "", expr: "" },
  F5: { key: "F5", value: "", expr: "" },
  F6: { key: "F6", value: "", expr: "" },
  F7: { key: "F7", value: "", expr: "" },
  F8: { key: "F8", value: "", expr: "" },
  F9: { key: "F9", value: "", expr: "" },
  F10: { key: "F10", value: "", expr: "" },
  F11: { key: "F11", value: "", expr: "" },
  F12: { key: "F12", value: "", expr: "" },
  F13: { key: "F13", value: "", expr: "" },
  F14: { key: "F14", value: "", expr: "" },
  F15: { key: "F15", value: "", expr: "" },
  G0: { key: "G0", value: "April", readOnly: true, expr: "" },
  G1: { key: "G1", value: "", expr: "" },
  G2: { key: "G2", value: "", expr: "" },
  G3: { key: "G3", value: "", expr: "" },
  G4: { key: "G4", value: "", expr: "" },
  G5: { key: "G5", value: "", expr: "" },
  G6: { key: "G6", value: "", expr: "" },
  G7: { key: "G7", value: "", expr: "" },
  G8: { key: "G8", value: "", expr: "" },
  G9: { key: "G9", value: "", expr: "" },
  G10: { key: "G10", value: "", expr: "" },
  G11: { key: "G11", value: "", expr: "" },
  G12: { key: "G12", value: "", expr: "" },
  G13: { key: "G13", value: "", expr: "" },
  G14: { key: "G14", value: "", expr: "" },
  G15: { key: "G15", value: "", expr: "" },
  H0: { key: "H0", value: "April", readOnly: true, expr: "" },
  H1: { key: "H1", value: "", expr: "" },
  H2: { key: "H2", value: "", expr: "" },
  H3: { key: "H3", value: "", expr: "" },
  H4: { key: "H4", value: "", expr: "" },
  H5: { key: "H5", value: "", expr: "" },
  H6: { key: "H6", value: "", expr: "" },
  H7: { key: "H7", value: "", expr: "" },
  H8: { key: "H8", value: "", expr: "" },
  H9: { key: "H9", value: "", expr: "" },
  H10: { key: "H10", value: "", expr: "" },
  H11: { key: "H11", value: "", expr: "" },
  H12: { key: "H12", value: "", expr: "" },
  H13: { key: "H13", value: "", expr: "" },
  H14: { key: "H14", value: "", expr: "" },
  H15: { key: "H15", value: "", expr: "" },
  I0: { key: "I0", value: "April", readOnly: true, expr: "" },
  I1: { key: "I1", value: "", expr: "" },
  I2: { key: "I2", value: "", expr: "" },
  I3: { key: "I3", value: "", expr: "" },
  I4: { key: "I4", value: "", expr: "" },
  I5: { key: "I5", value: "", expr: "" },
  I6: { key: "I6", value: "", expr: "" },
  I7: { key: "I7", value: "", expr: "" },
  I8: { key: "I8", value: "", expr: "" },
  I9: { key: "I9", value: "", expr: "" },
  I10: { key: "I10", value: "", expr: "" },
  I11: { key: "I11", value: "", expr: "" },
  I12: { key: "I12", value: "", expr: "" },
  I13: { key: "I13", value: "", expr: "" },
  I14: { key: "I14", value: "", expr: "" },
  I15: { key: "I15", value: "", expr: "" },
  J0: { key: "J0", value: "April", readOnly: true, expr: "" },
  J1: { key: "J1", value: "", expr: "" },
  J2: { key: "J2", value: "", expr: "" },
  J3: { key: "J3", value: "", expr: "" },
  J4: { key: "J4", value: "", expr: "" },
  J5: { key: "J5", value: "", expr: "" },
  J6: { key: "J6", value: "", expr: "" },
  J7: { key: "J7", value: "", expr: "" },
  J8: { key: "J8", value: "", expr: "" },
  J9: { key: "J9", value: "", expr: "" },
  J10: { key: "J10", value: "", expr: "" },
  J11: { key: "J11", value: "", expr: "" },
  J12: { key: "J12", value: "", expr: "" },
  J13: { key: "J13", value: "", expr: "" },
  J14: { key: "J14", value: "", expr: "" },
  J15: { key: "J15", value: "", expr: "" },
  K0: { key: "K0", value: "April", readOnly: true, expr: "" },
  K1: { key: "K1", value: "", expr: "" },
  K2: { key: "K2", value: "", expr: "" },
  K3: { key: "K3", value: "", expr: "" },
  K4: { key: "K4", value: "", expr: "" },
  K5: { key: "K5", value: "", expr: "" },
  K6: { key: "K6", value: "", expr: "" },
  K7: { key: "K7", value: "", expr: "" },
  K8: { key: "K8", value: "", expr: "" },
  K9: { key: "K9", value: "", expr: "" },
  K10: { key: "K10", value: "", expr: "" },
  K11: { key: "K11", value: "", expr: "" },
  K12: { key: "K12", value: "", expr: "" },
  K13: { key: "K13", value: "", expr: "" },
  K14: { key: "K14", value: "", expr: "" },
  K15: { key: "K15", value: "", expr: "" },
  L0: { key: "L0", value: "April", readOnly: true, expr: "" },
  L1: { key: "L1", value: "", expr: "" },
  L2: { key: "L2", value: "", expr: "" },
  L3: { key: "L3", value: "", expr: "" },
  L4: { key: "L4", value: "", expr: "" },
  L5: { key: "L5", value: "", expr: "" },
  L6: { key: "L6", value: "", expr: "" },
  L7: { key: "L7", value: "", expr: "" },
  L8: { key: "L8", value: "", expr: "" },
  L9: { key: "L9", value: "", expr: "" },
  L10: { key: "L10", value: "", expr: "" },
  L11: { key: "L11", value: "", expr: "" },
  L12: { key: "L12", value: "", expr: "" },
  L13: { key: "L13", value: "", expr: "" },
  L14: { key: "L14", value: "", expr: "" },
  L15: { key: "L15", value: "", expr: "" }
};

export default () => {
  const [cells, setCells] = useState(fetchCells);

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
          return { readOnly: true, value: row.value };
        }
        if (j === 0) {
          return { readOnly: true, value: row.value };
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
        return { className: "equation", value, expr };
      } else {
        return { className: "error", value: "error", expr: "" };
      }
    }
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

  const onCellsChanged = changes => {
    const copyCells = { ...cells };

    changes.forEach(({ cell, value }) => {
      cellUpdate(copyCells, cell, value);
    });

    setCells(copyCells);
  };

  return (
    <Datasheet
      data={generateGrid()}
      valueRenderer={cell => cell.value}
      dataRenderer={cell => cell.expr}
      onCellsChanged={onCellsChanged}
    />
  );
};
