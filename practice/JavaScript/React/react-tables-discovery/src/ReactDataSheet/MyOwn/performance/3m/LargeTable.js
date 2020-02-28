import React, { useState, useMemo } from "react";
import TableSmall from "./SmallTable";

const getSummaryObjectOfArrays = (selector, name) => {
  const obj = {};

  Object.values(selector).forEach((_, idx) => {
    obj[`${idx}`] = [0, 0, 0, 0];
  });

  return obj;
};

export default props => {
  const [result, setResult] = useState(props.block.result);

  const tables = useMemo(
    () => getSummaryObjectOfArrays(props.block.tables, "table"),
    []
  );

  const handleUpdate = (updated, name) => {
    tables[name] = updated;
    // results["result1"] = [];

    // При условии того, что первая таблица всегда идет в +, а остальные в -
    const updatedResult = Object.fromEntries(
      Object.entries(result).map(([key, cell], index) => {
        if (index !== 0) {
          Object.values(tables).forEach((table, idx) => {
            if (idx === 0) {
              cell.value = table[index];
            } else {
              cell.value -= table[index];
            }
          });
        }

        // results["result1"].push(cell.value);

        return [key, cell];
      })
    );

    setResult(updatedResult);
  };

  return (
    <>
      {props.block.tables.map((table, idx) => (
        <TableSmall
          key={`small-${idx}`}
          data={table}
          onUpdate={handleUpdate}
          name={idx}
        />
      ))}
      <TableSmall data={result} />
    </>
  );
};
