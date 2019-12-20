import React from "react";
import ReactDataGrid from "react-data-grid";

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

const firstNameActions = [
  {
    icon: <span className="glyphicon glyphicon-remove" />,
    callback: () => {
      alert("Deleting");
    }
  },
  {
    icon: "glyphicon glyphicon-link",
    actions: [
      {
        text: "Option 1",
        callback: () => {
          alert("Option 1 clicked");
        }
      },
      {
        text: "Option 2",
        callback: () => {
          alert("Option 2 clicked");
        }
      }
    ]
  }
];
function getCellActions(column, row) {
  const cellActions = {
    firstName: firstNameActions
  };
  return row.id % 2 === 0 ? cellActions[column.key] : null;
}

const ROW_COUNT = 50;

function Example({ rows }) {
  return (
    <div>
      <ReactDataGrid
        columns={columns}
        rowGetter={i => rows[i]}
        rowsCount={ROW_COUNT}
        minHeight={500}
        getCellActions={getCellActions}
      />
    </div>
  );
}

export default Example;
