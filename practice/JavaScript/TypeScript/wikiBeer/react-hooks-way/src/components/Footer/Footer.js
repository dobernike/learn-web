import React from "react";
import NavigationList from "./NavigationList/NavigationList";

export default function Footer(props) {
  return (
    <footer className="main-footer">

      {props.isOpen ?
        <NavigationList handlePagination={props.handlePagination} page={props.page} />
        : null}

    </footer>
  );
}
