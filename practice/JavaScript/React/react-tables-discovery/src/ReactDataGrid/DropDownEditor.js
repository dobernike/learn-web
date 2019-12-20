import React from "react";
import ReactDataGrid from "react-data-grid";
import { Editors } from "react-data-grid-addons";

import "./styles.css";
import PageGuide from "./PageGuide";

const { DropDownEditor } = Editors;
const issueTypes = [
  { id: "bug", value: "Bug" },
  { id: "epic", value: "Epic" },
  { id: "story", value: "Story" }
];
const IssueTypeEditor = <DropDownEditor options={issueTypes} />;

const columns = [
  { key: "id", name: "ID" },
  { key: "title", name: "Title" },
  { key: "complete", name: "Complete" },
  { key: "issueType", name: "Task Type", editor: IssueTypeEditor }
];

const rows = [
  { id: 0, title: "Task 1", issueType: "Bug", complete: 20 },
  { id: 1, title: "Task 2", issueType: "Story", complete: 40 },
  { id: 2, title: "Task 3", issueType: "Epic", complete: 60 }
];

class Example extends React.Component {
  state = { rows };

  onGridRowsUpdated = ({ fromRow, toRow, updated }) => {
    this.setState(state => {
      const rows = state.rows.slice();
      for (let i = fromRow; i <= toRow; i++) {
        rows[i] = { ...rows[i], ...updated };
      }
      return { rows };
    });
  };
  render() {
    return (
      <div>
        <ReactDataGrid
          columns={columns}
          rowGetter={i => this.state.rows[i]}
          rowsCount={3}
          onGridRowsUpdated={this.onGridRowsUpdated}
          enableCellSelect={true}
        />
        <PageGuide />
      </div>
    );
  }
}

export default Example;
