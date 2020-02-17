import React from "react";
import Handsontable from "handsontable";
import { HotTable } from "@handsontable/react";

import "handsontable/dist/handsontable.min.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hotData: Handsontable.helper.createSpreadsheetData(10, 10),
      secondColumnSettings: {
        title: "Second column header",
        readOnly: true
      }
    };
    console.log(Handsontable.helper.createSpreadsheetData(10, 10));
    console.log(this.state);
  }

  render() {
    return (
      <HotTable
        data={this.state.hotData}
        licenseKey="non-commercial-and-evaluation"
        colHeaders={["Январь"]}
        rowHeaders={["some"]}
        rowHeaderWidth={["some", "ofs"]}
      >
        {/* <HotColumn title="First column header" /> */}
        {/* <HotColumn settings={this.state.secondColumnSettings} /> */}
      </HotTable>
    );
  }
}

export default App;
