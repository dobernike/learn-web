import React, { useState } from "react";
import DataSheet from "react-datasheet";

import "./MyOwn/table2.css";

const fetch = {
  grid: [
    [
      { value: "Ordinary Bitter" },
      { value: "20 - 35" },
      { value: "5 - 12" },
      { value: 4, attributes: { "data-foo": "bar" } }
    ],
    [
      { value: "Special Bitter" },
      { value: "28 - 40" },
      { value: "6 - 14" },
      { value: 4 }
    ],
    [{ value: "ESB" }, { value: "30 - 45" }, { value: "6 - 14" }, { value: 5 }],
    [
      { value: "Scottish Light" },
      { value: "9 - 20" },
      { value: "6 - 15" },
      { value: 3 }
    ],
    [
      { value: "Scottish Heavy" },
      { value: "12 - 20" },
      { value: "8 - 30" },
      { value: 4 }
    ],
    [
      { value: "Scottish Export" },
      { value: "15 - 25" },
      { value: "9 - 19" },
      { value: 4 }
    ],
    [
      { value: "English Summer Ale" },
      { value: "20 - 30" },
      { value: "3 - 7" },
      { value: 3 }
    ],
    [
      { value: "English Pale Ale" },
      { value: "20 - 40" },
      { value: "5 - 12" },
      { value: 4 }
    ],
    [
      { value: "English IPA" },
      { value: "35 - 63" },
      { value: "6 - 14" },
      { value: 4 }
    ],
    [
      { value: "Strong Ale" },
      { value: "30 - 65" },
      { value: "8 - 21" },
      { value: 4 }
    ],
    [
      { value: "Old Ale" },
      { value: "30 -65" },
      { value: "12 - 30" },
      { value: 4 }
    ],
    [
      { value: "Pale Mild Ale" },
      { value: "10 - 20" },
      { value: "6 - 9" },
      { value: 3 }
    ],
    [
      { value: "Dark Mild Ale" },
      { value: "10 - 24" },
      { value: "17 - 34" },
      { value: 3 }
    ],
    [
      { value: "Brown Ale" },
      { value: "12 - 25" },
      { value: "12 - 17" },
      { value: 3 }
    ]
  ]
};

export default () => {
  const [gridState, setGridState] = useState(fetch.grid);

  const handleCellsChanged = (changes, additions) => {
    const grid = gridState.map(row => [...row]);
    changes.forEach(({ cell, row, col, value }) => {
      grid[row][col] = { ...grid[row][col], value };
    });
    // paste extended beyond end, so add a new row
    additions &&
      additions.forEach(({ _, row, col, value }) => {
        if (!grid[row]) {
          grid[row] = [
            { value: "" },
            { value: "" },
            { value: "" },
            { value: 0 }
          ];
        }
        if (grid[row][col]) {
          grid[row][col] = { ...grid[row][col], value };
        }
      });
    setGridState(grid);
  };

  const sheetRenderer = props => {
    return (
      <div className={props.className}>
        <div className="data-body">{props.children}</div>
      </div>
    );
  };

  const rowRenderer = props => {
    return <div className="data-row">{props.children}</div>;
  };

  const cellRenderer = props => {
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
      data={gridState}
      className="custom-sheet"
      sheetRenderer={sheetRenderer}
      rowRenderer={rowRenderer}
      cellRenderer={cellRenderer}
      onCellsChanged={handleCellsChanged}
      valueRenderer={cell => cell.value}
    />
  );
};
