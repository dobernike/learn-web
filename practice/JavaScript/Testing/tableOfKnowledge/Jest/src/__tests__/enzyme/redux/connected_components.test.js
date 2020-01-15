import { connect } from "react-redux";
class App extends Component {
  /* ... */
}
export default connect(mapStateToProps)(App);

import App from "./App";

import { connect } from "react-redux";
// Use named export for unconnected component (for tests)
export class App extends Component {
  /* ... */
}
// Use default export for the connected component (for app)
export default connect(mapStateToProps)(App);

// Note the curly braces: grab the named export instead of default export
import { App } from "./App";

import ConnectedApp, { App } from "./App";
