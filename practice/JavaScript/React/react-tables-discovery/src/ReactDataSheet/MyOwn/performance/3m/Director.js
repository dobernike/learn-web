import React, { useState, useMemo, useCallback, useEffect } from "react";
import { StickyContainer, Sticky } from "react-sticky";
import LargeTable from "./LargeTable";
import TableSmall from "./SmallTable";
import table9 from "./mock.json";

const getSummaryObjectOfArrays = (selector, name) => {
  const obj = {};

  Object.values(selector).forEach((_, idx) => {
    obj[`${name}${idx + 1}`] = [0, 0, 0, 0];
  });

  return obj;
};

export default () => {
  const [result9, setResult9] = useState(table9.results.result1);
  const [result10, setResult10] = useState(table9.results.result2);
  const [result11, setResult11] = useState(table9.results.result3);

  const [generalTop, setGeneralTop] = useState(table9.generalTop);
  const [generalBottom, setGeneralBottom] = useState(table9.generalBottom);

  const [head, setHead] = useState(table9.head);

  // const [nchpd, setNchpd] = useState(table9.nchdp);

  const tables91 = useMemo(() => table9.tables, [table9]);

  const tables = useMemo(
    () => getSummaryObjectOfArrays(table9.tables, "table"),
    []
  );

  const results = useMemo(
    () => getSummaryObjectOfArrays(table9.results, "result"),
    []
  );

  const generals = useMemo(
    () => ({
      generalTop: [0, 0, 0, 0],
      generalBottom: [0, 0, 0, 0]
    }),
    []
  );

  const handleGeneralTopUpdate = () => {
    generals["generalTop"] = [];

    const updatedResult = Object.fromEntries(
      Object.entries(generalTop).map(([key, cell], idx) => {
        if (idx !== 0) {
          cell.value =
            +results["result1"][idx] +
            +results["result2"][idx] +
            +results["result3"][idx];
        }
        generals["generalTop"].push(cell.value);

        return [key, cell];
      })
    );
    setGeneralTop(updatedResult);
  };

  useEffect(() => handleGeneralTopUpdate, [result9, result10, result11]);

  const handleGeneralBottomUpdate = () => {
    generals["generalBottom"] = [];

    const updatedResult = Object.fromEntries(
      Object.entries(generalBottom).map(([key, cell], idx) => {
        if (idx !== 0) {
          if (idx !== 1) {
            cell.value =
              +generals["generalBottom"][idx - 1] +
              +generals["generalTop"][idx];
          } else {
            cell.value = +head.A1.value + +generals["generalTop"][idx];
          }
        }

        generals["generalBottom"].push(cell.value);

        return [key, cell];
      })
    );

    setGeneralBottom(updatedResult);
  };

  useEffect(() => handleGeneralBottomUpdate, [generalTop]);

  const heads = useMemo(
    () => ({
      head: [0, 0, 0, 0, 0, 0, 0, 0]
    }),
    []
  );

  const handleUpdateHead = () => {
    heads["head"] = [];

    const updatedResult = Object.fromEntries(
      Object.entries(head).map(([key, cell], idx) => {
        if (idx > 5) {
          cell.value = +generals["generalBottom"][idx - 5];
        }

        heads["head"].push(cell.value);

        return [key, cell];
      })
    );

    setHead(updatedResult);
  };

  useEffect(() => handleUpdateHead, [generalBottom]);

  const handleUpdate9 = useCallback(
    (updated, name) => {
      tables[name] = updated;
      results["result1"] = [];

      const updatedResult = Object.fromEntries(
        Object.entries(result9).map(([key, cell], idx) => {
          if (idx !== 0) {
            cell.value =
              +tables["table1"][idx] +
              +tables["table2"][idx] -
              +tables["table3"][idx];
          }

          results["result1"].push(cell.value);

          return [key, cell];
        })
      );

      setResult9(updatedResult);
    },
    [result9]
  );

  // const handleUpdate10 = useCallback(
  //   (updated, name) => {
  //     tables[name] = updated;
  //     results["result2"] = [];

  //     const updatedResult = Object.fromEntries(
  //       Object.entries(result10).map(([key, cell], idx) => {
  //         if (idx !== 0) {
  //           cell.value = +tables["table4"][idx] - +tables["table5"][idx];
  //         }

  //         results["result2"].push(cell.value);

  //         return [key, cell];
  //       })
  //     );

  //     setResult10(updatedResult);
  //   },
  //   [result10]
  // );

  // const handleUpdate11 = useCallback(
  //   (updated, name) => {
  //     tables[name] = updated;
  //     results["result3"] = [];

  //     const updatedResult = Object.fromEntries(
  //       Object.entries(result11).map(([key, cell], idx) => {
  //         if (idx !== 0) {
  //           cell.value = +tables["table6"][idx] - +tables["table7"][idx];
  //         }

  //         results["result3"].push(cell.value);

  //         return [key, cell];
  //       })
  //     );

  //     setResult11(updatedResult);
  //   },
  //   [result11]
  // );

  return (
    <article
      style={{
        padding: "0 5%",
        backgroundColor: "#F8F8F8",
        paddingTop: "1rem"
      }}
    >
      <hr />
      <br />
      <hr />
      <StickyContainer>
        {/* <Sticky>
          {({ style }) => (
            <div style={style}>
              <TableSmall data={head} onUpdate={() => {}} />
            </div>
          )}
        </Sticky> */}

        {table9.blocks.map((block, idx) => (
          <LargeTable key={`large-${idx}`} block={block} />
        ))}

        <TableSmall data={generalTop} />
        {/* <TableSmall data={generalBottom} />
        <TableSmall data={nchpd} />   */}
      </StickyContainer>
    </article>
  );
};
