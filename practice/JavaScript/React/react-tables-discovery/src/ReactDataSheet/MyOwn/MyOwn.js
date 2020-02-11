import React from "react";
import TableOver from "./MyOver";
import { table8 } from "./mockData";

export default () => {
  return (
    <article
      style={{
        padding: "0 5%",
        backgroundColor: "#F8F8F8",
        paddingTop: "1rem"
      }}
    >
      <TableOver data={table8} />
    </article>
  );
};
