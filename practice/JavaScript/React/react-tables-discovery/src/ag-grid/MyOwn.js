import React, { Component } from "react";
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModules } from "@ag-grid-community/all-modules";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modules: AllCommunityModules,
      columnDefs: [
        {
          headerName: "Make",
          field: "make"
        },
        {
          headerName: "Model",
          field: "model"
        },
        {
          headerName: "Price",
          field: "price"
        }
      ],
      defaultColDef: {
        editable: true,
        resizable: true
      },
      rowData: [
        {
          make: "Toyota",
          model: "Celica",
          price: 35000
        },
        {
          make: "Ford",
          model: "Mondeo",
          price: 32000
        },
        {
          make: "Porsche",
          model: "Boxter",
          price: 72000
        }
      ]
      // rowData: null
    };
  }

  componentDidMount() {
    // fetch("https://api.myjson.com/bins/15psn9")
    //   .then(res => res.json())
    //   .then(rowData => this.setState({ rowData }))
    //   .catch(err => console.log(err));
  }

  onButtonClick = () => {
    const SelectedNodes = this.gridApi.getSelectedNodes();
    const SelectedData = SelectedNodes.map(node => node.data);
    const selectedDataStringPresentation = SelectedData.map(
      node => node.make + " " + node.model
    ).join(", ");
    alert(`Selected Nodes: ${selectedDataStringPresentation}`);
  };

  render() {
    return (
      <div
        className="ag-theme-balham"
        style={{
          height: 600,
          width: 600
        }}
      >
        <button onClick={this.onButtonClick}>Get Selected Rows</button>
        <AgGridReact
          modules={this.state.modules}
          columnDefs={this.state.columnDefs}
          rowData={this.state.rowData}
          rowSelection="multiple"
          defaultColDef={this.state.defaultColDef}
          onGridReady={params => (this.gridApi = params.api)}
        ></AgGridReact>
      </div>
    );
  }
}

export default App;
