import React, { useState, useReducer } from "react";
import { render } from "react-dom";
import { log, getInitialItems } from "./utils";

const List = React.memo(({ items, inc }) => {
  log("renderList");
  return items.map((item, key) => (
    <div key={key} style={{ display: "flex" }}>
      <div>item: {item.text}</div>
      <button onClick={inc}>inc</button>
    </div>
  ));
});

function App() {
  log("renderApp");

  const [count, dispatch] = useReducer(c => c + 1, 0);
  const [items, setItems] = useState(getInitialItems(10));

  return (
    <div>
      <div style={{ display: "flex" }}>
        <h1>{count}</h1>
        <button onClick={dispatch}>inc</button>
      </div>
      <List items={items} inc={dispatch} />
    </div>
  );
}

render(<App />, document.getElementById("root"));
