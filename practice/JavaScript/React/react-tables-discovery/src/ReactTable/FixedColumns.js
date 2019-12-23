import React from "react";
import { render } from "react-dom";
import { makeData, Logo, Tips } from "./Utils";
import withFixedColumns from "react-table-hoc-fixed-columns";

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";

const ReactTableFixedColumns = withFixedColumns(ReactTable);

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      data: makeData()
    };
  }
  render() {
    const { data } = this.state;
    return (
      <div>
        <ReactTableFixedColumns
          data={data}
          columns={[
            {
              Header: "Name",
              fixed: "left",
              columns: [
                {
                  Header: "First Name",
                  accessor: "firstName",
                  width: 100
                },
                {
                  Header: "Last Name",
                  accessor: "lastName",
                  width: 100
                }
              ]
            },
            {
              Header: "Info",
              columns: [
                {
                  Header: "Age",
                  accessor: "age",
                  width: 300,
                  Footer: row => {
                    const length = row.data.length;
                    const ageSum = row.data
                      .map(({ age }) => age)
                      .reduce((a, b) => a + b, 0);
                    const average = Math.round(ageSum / length);
                    return <div>average: {average}</div>;
                  }
                },
                {
                  Header: "Visits",
                  accessor: "visits",
                  width: 300
                },
                {
                  Header: "Progress",
                  accessor: "progress",
                  width: 300
                },
                {
                  Header: "Age",
                  accessor: "age",
                  id: "age2",
                  width: 300
                },
                {
                  Header: "Visits",
                  accessor: "visits",
                  id: "visits2",
                  width: 300
                },
                {
                  Header: "Progress",
                  accessor: "progress",
                  id: "progress2",
                  width: 300
                }
              ]
            },
            {
              Header: "",
              fixed: "right",
              columns: [
                {
                  Header: "Status",
                  accessor: "status"
                }
              ]
            }
          ]}
          defaultPageSize={50}
          style={{ height: 500 }}
          className="-striped"
        />
        <br />
        <Tips />
        <Logo />
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
