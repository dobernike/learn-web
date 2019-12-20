import React from "react";
import ReactDataGrid from "react-data-grid";

import "./styles.css";

const defaultColumnProperties = {
  resizable: true,
  width: 120
};

const columns = [
  {
    key: "id",
    name: "ID"
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

function Example({ initialRows }) {
  const rows = initialRows;
  return (
    <ReactDataGrid
      columns={columns}
      rowGetter={i => rows[i]}
      rowsCount={ROW_COUNT}
      minHeight={500}
      onColumnResize={(idx, width) =>
        console.log(`Column ${idx} has been resized to ${width}`)
      }
    />
  );
}

export default Example;
