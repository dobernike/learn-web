import React, { useState, useMemo, useCallback, useEffect } from "react";
import { StickyContainer, Sticky } from "react-sticky";
import LargeTable from "./LargeTable";
import TableSmall from "./SmallTable";
import table9 from "./mock.json";

const getSummaryObjectOfArrays = (selector, name) => {
  const obj = {};

  Object.values(selector).forEach((_, idx) => {
    obj[`${name}-${idx}`] = [0, 0, 0, 0];
  });

  return obj;
};

const res = getSummaryObjectOfArrays(table9.results, "result");

export default () => {
  const [head, setHead] = useState(table9.head);
  const [results, setResults] = useState(res);
  const [generalResult, setGeneralResult] = useState(
    table9.generals.generalResult
  );
  const [generalResultNextMonth, setGeneralResultNextMonth] = useState(
    table9.generals.generalResultNextMonth
  );
  const [nchpd, setNchpd] = useState(table9.generals.nchdp);

  const generals = useMemo(
    () => ({
      generalResult: [0, 0, 0, 0],
      generalResultNextMonth: [0, 0, 0, 0]
    }),
    []
  );

  const handleGeneralResultUpdate = results => {
    generals["generalResult"] = [];

    const updatedResult = Object.fromEntries(
      Object.entries(generalResult).map(([key, cell], idx) => {
        if (idx !== 0) {
          cell.value = 0;
          for (let result of Object.values(results)) {
            console.log(result[idx]);
            cell.value += result[idx];
          }
        }

        generals["generalResult"].push(cell.value);

        return [key, cell];
      })
    );
    setGeneralResult(updatedResult);
  };

  useEffect(() => handleGeneralResultUpdate(results), [results]);

  const handleGeneralResultNextMonthUpdate = () => {
    generals["generalResultNextMonth"] = [];

    const updatedResult = Object.fromEntries(
      Object.entries(generalResultNextMonth).map(([key, cell], idx) => {
        if (idx !== 0) {
          if (idx !== 1) {
            cell.value =
              +generals["generalResultNextMonth"][idx - 1] +
              +generals["generalResult"][idx];
          } else {
            cell.value = +head.A1.value + +generals["generalResult"][idx];
          }
        }

        generals["generalResultNextMonth"].push(cell.value);

        return [key, cell];
      })
    );

    setGeneralResultNextMonth(updatedResult);
  };

  useEffect(() => handleGeneralResultNextMonthUpdate, [
    generalResult,
    head.A1.value
  ]);

  const handleNchdpUpdate = () => {
    const updatedResult = Object.fromEntries(
      Object.entries(nchpd).map(([key, cell], idx) => {
        if (idx !== 0) {
          cell.value = +generals["generalResultNextMonth"][idx];
        }

        return [key, cell];
      })
    );

    setNchpd(updatedResult);
  };

  useEffect(() => handleNchdpUpdate, [generalResultNextMonth]);

  const heads = useMemo(
    () => ({
      head: [0, 0, 0, 0, 0, 0, 0, 0]
    }),
    []
  );

  const handleUpdateHead = (_, __, value) => {
    heads["head"] = [];

    const updatedResult = Object.fromEntries(
      Object.entries(head).map(([key, cell], idx) => {
        if (value && idx > 4) {
          cell.value = value;
        } else if (idx > 5) {
          cell.value = +generals["generalResultNextMonth"][idx - 5];
        }

        heads["head"].push(cell.value);

        return [key, cell];
      })
    );

    setHead(updatedResult);
  };

  useEffect(() => handleUpdateHead, [generalResultNextMonth]);

  const handleUpdateResult = (name, result) =>
    setResults(prev => ({ ...prev, [name]: result }));

  return (
    <article
      style={{
        padding: "0 5%",
        backgroundColor: "#F8F8F8",
        paddingTop: "1rem"
      }}
    >
      <StickyContainer>
        <Sticky>
          {({ style }) => (
            <div style={style}>
              <TableSmall data={head} onUpdate={handleUpdateHead} />
            </div>
          )}
        </Sticky>

        {table9.blocks.map((block, idx) => (
          <LargeTable
            key={`large-${idx}`}
            name={`result-${idx}`}
            block={block}
            onUpdateResult={handleUpdateResult}
          />
        ))}

        <TableSmall data={generalResult} />
        <TableSmall data={generalResultNextMonth} />
        <TableSmall data={nchpd} />
      </StickyContainer>
    </article>
  );
};
