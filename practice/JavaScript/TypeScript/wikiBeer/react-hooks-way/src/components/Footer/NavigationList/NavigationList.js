import React from "react";
import NavigationItem from "./NavigationItem/NavigationItem";

export default function Navigation(props) {
  const items = [];

  for (let i = 0; i < props.page.LAST; i++) {
    let classes = ``;
    if (props.page.current === (i + 1)) classes = `active`;
    items.push(<NavigationItem key={`pageNav-${i}`} value={i + 1} classes={classes} />);
  }

  return (
    <nav className="pagination" role="navigation">
      <ul className="pagination__list" onClick={props.handlePagination}>
        <li>
          <a href="#-">left</a>&nbsp;
        </li>

        {items}
        
        <li>
          <a href="#+">right</a>
        </li>
      </ul>
    </nav>
  );
}
