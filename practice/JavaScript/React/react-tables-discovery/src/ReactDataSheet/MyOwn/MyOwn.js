import React from "react";
// import Table from "./table1";
import TableOver from "./MyOver";
import { header, table3 } from "./mockData";

export default () => {
  return (
    <article
      style={{
        padding: "0 5%",
        backgroundColor: "#F8F8F8",
        paddingTop: "1rem"
      }}
    >
      <h2 style={{ textAlign: "left", marginBottom: "2rem" }}>
        Движение денежных средств
      </h2>
      <TableOver data={table3} />
    </article>
  );
};
