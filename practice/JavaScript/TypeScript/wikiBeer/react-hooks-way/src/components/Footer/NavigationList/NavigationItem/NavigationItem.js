import React from "react";

export default function NavigationItem(props) {
  return (
      <li className={props.classes}>
        <a href={`#` + props.value}>{props.value}</a>
      </li>
  );
}
