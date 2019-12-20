import React from "react";
import ReactDataGrid from "react-data-grid";
import { Data } from "react-data-grid-addons";

import "./styles.css";

const defaultColumnProperties = {
  width: 160
};

const columns = [
  {
    key: "id",
    name: "ID"
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
    key: "jobTitle",
    name: "Job Title"
  },
  {
    key: "jobArea",
    name: "Job Area"
  },
  {
    key: "jobType",
    name: "Job Type"
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
    key: "catchPhrase",
    name: "Catch Phrase"
  }
].map(c => ({ ...c, ...defaultColumnProperties }));

function Example({ rows }) {
  const groupedRows = Data.Selectors.getRows({ rows });
  return (
    <div>
      <ReactDataGrid
        columns={columns}
        rowGetter={i => groupedRows[i]}
        rowsCount={groupedRows.length}
        minHeight={650}
        enableCellAutoFocus={false}
      />
    </div>
  );
}

export default Example;
