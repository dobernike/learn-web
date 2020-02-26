import React from "react";
import TableSmall from "./SmallTable";

export default props => {
  const tables = Object.values(props.tables).map(table => table);
  console.log(tables);

  return (
    <>
      <TableSmall
        data={props.tables.table1.table}
        onUpdate={props.onUpdate}
        name={props.tables.table1.name}
      />
      <TableSmall
        data={props.tables.table2.table}
        onUpdate={props.onUpdate}
        name={props.tables.table2.name}
      />
      <TableSmall
        data={props.tables.table3.table}
        onUpdate={props.onUpdate}
        name={props.tables.table3.name}
      />
      <TableSmall data={props.result} />
    </>
  );
};
