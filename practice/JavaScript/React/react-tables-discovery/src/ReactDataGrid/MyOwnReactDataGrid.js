import React from "react";
import ReactDataGrid from "react-data-grid";

import createRowData from "./createRowData";

import "./styles.css";

const columns = [
  {
    key: "id",
    name: "ID",
    frozen: true
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
    key: "bs",
    name: "bs"
  },
  {
    key: "catchPhrase",
    name: "Catch Phrase"
  },
  {
    key: "companyName",
    name: "Company Name"
  },
  {
    key: "sentence",
    name: "Sentence"
  }
];

const ROW_COUNT = 15000;
const rows = createRowData(15000);

function HelloWorld() {
  return (
    <ReactDataGrid
      columns={columns}
      rowGetter={i => rows[i]}
      rowsCount={ROW_COUNT}
      minHeight={600}
    />
  );
}

export default HelloWorld;
