import React from "react";
// import Table from "./table1";
import TableOver from "./MyOver";
import { table2 } from "./mockData";

export default () => {
  return (
    <article style={{ padding: "0 5%", backgroundColor: "#F8F8F8" }}>
      {/* <Table data={table1} /> */}
      {/* <hr /> */}
      <TableOver data={table2} />
    </article>
  );
};
