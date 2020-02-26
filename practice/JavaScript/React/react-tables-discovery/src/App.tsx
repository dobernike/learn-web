import React from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import ReactDataSheetComponents from "./ReactDataSheet";
import HooksPerfomed from "./ReactDataSheet/MyOwn/performance/3m/Director";
import RxPerfomed from "./ReactDataSheet/MyOwn/performance/rx/Director";
import NewJSONSheet from "./ReactDataSheet/MyOwn/performance/newJson/Director";
import ReactDataGreedComponents from "./ReactDataGrid";
import ReactTableComponents from "./ReactTable";
import ReactSpreadsheetComponents from "./reactSpreadsheet";
import HandlesontableComponents from "./handsontable";
import ReactSpreadsheetGridComponents from "./reactSpreadsheetGrid";
import AgGrid from "./ag-grid";
import Dhtmlx from "./dhtmlxSpreadSheet";
import Perfomed12mlong from "./ReactDataSheet/MyOwn/performance/12mlong/Director";

const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <nav>
          <ul>
            <li>
              <Link to="/reactDataGrid">ReactDataGrid</Link>
            </li>
            <li>
              <Link to="/reactTable">ReactTable</Link>
            </li>

            <li>
              <Link to="/handsontable">handlesontable</Link>
            </li>
            <li>
              <Link to="/agGrid">agGrid</Link>
            </li>
            <li>
              <Link to="/Dhtmlx">Dhtmlx</Link>
            </li>
            <li>
              <Link to="/reactDataSheet">
                ReactDataSheet{" "}
                <b style={{ color: "blue" }}>нет левого и вверхнего sticky</b>
              </Link>
              <ul>
                <li>
                  <Link to="/reactDataSheet-hooksTables">hooksTables</Link>
                </li>
                <li>
                  <Link to="/reactDataSheet-rxTables">rxTables</Link>
                </li>
                <li>
                  <Link to="/reactDataSheet-12mlong">12mlong</Link>
                </li>
                <li>
                  <Link to="/reactDataSheet-jsonTables">JSONTable</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="/reactspreadsheetgrid">
                reactspreadsheetgrid{" "}
                <b style={{ color: "red" }}>
                  нет левого и вверхнего sticky, формул, readOnly
                </b>
              </Link>
            </li>
            <li>
              <Link to="/reactspread">
                ReactSpreadsheet <b style={{ color: "red" }}>НЕ ПОДХОДИТ</b>
              </Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/reactDataSheet">
            <ReactDataSheetComponents />
          </Route>
          <Route path="/reactDataSheet-hooksTables">
            <HooksPerfomed />
          </Route>
          <Route path="/reactDataSheet-rxTables">
            <RxPerfomed />
          </Route>
          <Route path="/reactDataSheet-12mlong">
            <Perfomed12mlong />
          </Route>
          <Route path="/reactDataSheet-jsonTables">
            <NewJSONSheet />
          </Route>
          <Route path="/reactDataGrid">
            <ReactDataGreedComponents />
          </Route>
          <Route path="/reactTable">
            <ReactTableComponents />
          </Route>
          <Route path="/reactspread">
            <ReactSpreadsheetComponents />
          </Route>
          <Route path="/handsontable">
            <HandlesontableComponents />
          </Route>
          <Route path="/reactspreadsheetgrid">
            <ReactSpreadsheetGridComponents />
          </Route>
          <Route path="/agGrid">
            <AgGrid />
          </Route>
          <Route path="/Dhtmlx">
            <Dhtmlx />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default App;
