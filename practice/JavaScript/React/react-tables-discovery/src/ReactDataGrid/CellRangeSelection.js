import React from "react";
import ReactDataGrid from "react-data-grid";
import { Menu } from "react-data-grid-addons";

import "./styles.css";
const { ContextMenu, MenuItem, SubMenu, ContextMenuTrigger } = Menu;

const defaultColumnProperties = {
  sortable: true,
  width: 120
};

const columns = [
  {
    key: "id",
    name: "ID",
    sortDescendingFirst: true
  },
  {
    key: "title",
    name: "Title"
  },
  {
    key: "firstName",
    name: "First Name"
  },
  {
    key: "lastName",
    name: "Last Name"
  },
  {
    key: "email",
    name: "Email"
  },
  {
    key: "street",
    name: "Street"
  },
  {
    key: "zipCode",
    name: "ZipCode"
  },
  {
    key: "date",
    name: "Date"
  },
  {
    key: "jobTitle",
    name: "Job Title"
  },
  {
    key: "catchPhrase",
    name: "Catch Phrase"
  },
  {
    key: "jobArea",
    name: "Job Area"
  },
  {
    key: "jobType",
    name: "Job Type"
  }
].map(c => ({ ...c, ...defaultColumnProperties }));

const ROW_COUNT = 50;

function Example({ rows }) {
  return (
    <div>
      <ReactDataGrid
        columns={columns}
        rowGetter={i => rows[i]}
        rowsCount={ROW_COUNT}
        minHeight={500}
        cellRangeSelection={{
          onStart: args => console.log(rows),
          onUpdate: args => console.log(rows),
          onComplete: args => console.log(rows)
        }}
      />
    </div>
  );
}

export default Example;
