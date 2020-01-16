import React from "react";
import Table from "./table1";
import { table1, header } from "./mockData";

export default () => {
  return (
    <article style={{ padding: "0 5%", backgroundColor: "#F8F8F8" }}>
      <Table data={header} />
      <Table data={table1} />
      <Table data={table1} />
      <Table data={table1} />
    </article>
  );
};
