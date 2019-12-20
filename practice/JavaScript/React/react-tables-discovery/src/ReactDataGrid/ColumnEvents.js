import React from "react";
import ReactDataGrid from "react-data-grid";

import "./styles.css";

import PageGuide from "./PageGuide";

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
    name: "First Name",
    events: {
      onDoubleClick: function(ev, args) {
        console.log(
          "The user entered edit mode on title column with rowIdx: " +
            args.rowIdx +
            " & rowId: " +
            args.rowId
        );
      }
    }
  },
  {
    key: "lastName",
    name: "Last Name",
    events: {
      onMouseOver: function(ev) {
        console.log(`Mouse over Last Name Column`);
      }
    }
  },
  {
    key: "jobTitle",
    name: "Job Title",
    events: {
      onContextMenu: function(ev) {
        console.log(`Context Menu is opened`);
      }
    }
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

const ROW_COUNT = 50;

function Example({ rows }) {
  return (
    <div>
      <ReactDataGrid
        columns={columns}
        rowGetter={i => rows[i]}
        rowsCount={ROW_COUNT}
        minHeight={500}
      />
      <PageGuide />
    </div>
  );
}

export default Example;
