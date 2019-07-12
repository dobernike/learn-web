import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";

const starWarsChars = [
  { name: "Дарт Вэйдер", side: "dark" },
  { name: "Люк Скайворкер", side: "light" },
  { name: "Палпатин", side: "dark" },
  { name: "Обиван Кеноби", side: "light" }
];

const App = ({ list, side }) => {
  const filtredList = list.filter(char => char.side === side);
  return (
    <ul>
      {filtredList.map((char, index) => {
        return (
          <li key={char.name + index}>
            <strong>{char.name}</strong> - &nbsp;
            {char.side}
          </li>
        );
      })}
    </ul>
  );
};

ReactDOM.render(
  <App list={starWarsChars} side="light" />,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
