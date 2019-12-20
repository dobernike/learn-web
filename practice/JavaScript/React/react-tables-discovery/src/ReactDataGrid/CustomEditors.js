import React from "react";
import ReactDOM from "react-dom";
import ReactDataGrid from "react-data-grid";
import { SketchPicker } from "react-color";

import "./styles.css";
import PageGuide from "./PageGuide";

class ColorEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { color: props.value };
  }

  getValue() {
    return { labelColour: this.state.color };
  }

  getInputNode() {
    return ReactDOM.findDOMNode(this).getElementsByTagName("input")[0];
  }

  handleChangeComplete = color => {
    this.setState({ color: color.hex }, () => this.props.onCommit());
  };
  render() {
    return (
      <SketchPicker
        color={this.state.color}
        onChange={this.handleChangeComplete}
      />
    );
  }
}

const columns = [
  { key: "id", name: "ID" },
  { key: "title", name: "Title" },
  { key: "labelColour", name: "Label Colour", editor: ColorEditor }
];

const rows = [
  { id: 0, title: "Task 1", issueType: "Bug", labelColour: "#1D1D1F" },
  { id: 1, title: "Task 2", issueType: "Story", labelColour: "#1D1D1F" },
  { id: 2, title: "Task 3", issueType: "Epic", labelColour: "1D1D1F" }
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
