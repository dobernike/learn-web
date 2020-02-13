import React from "react";
import TableOver from "./MyOver";
import TableOver2 from "./MyOwn2/MyOver";
import { table7, table9 } from "./mockData";

export default () => {
  return (
    <article
      style={{
        padding: "0 5%",
        backgroundColor: "#F8F8F8",
        paddingTop: "1rem"
      }}
    >
      <TableOver2 data={table9} />
      <hr />
      <br />
      <hr />
      <TableOver data={table7} />
    </article>
  );
};
