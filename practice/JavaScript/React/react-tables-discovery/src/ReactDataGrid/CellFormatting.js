import React from "react";
import ReactDataGrid from "react-data-grid";
import { ProgressBar } from "react-bootstrap";
import "./styles.css";

const ProgressBarFormatter = ({ value }) => {
  return <ProgressBar now={value} label={`${value}%`} />;
};

const columns = [
  { key: "id", name: "ID" },
  { key: "title", name: "Title" },
  { key: "complete", name: "Complete", formatter: ProgressBarFormatter }
];

const rows = [
  { id: 0, title: "Task 1", complete: 20 },
  { id: 1, title: "Task 2", complete: 40 },
  { id: 2, title: "Task 3", complete: 60 }
];

function Example() {
  return (
    <ReactDataGrid
      columns={columns}
      rowGetter={i => rows[i]}
      rowsCount={rows.length}
    />
  );
}

export default Example;
