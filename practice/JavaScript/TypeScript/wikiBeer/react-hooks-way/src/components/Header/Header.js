import React from "react";
import TopPanel from "./TopPanel/TopPanel";
import SearchSortPanel from "./SearchSortPanel/SearchSortPanel";

export default function Header(props) {
  return (
    <header className="main-header">
      <TopPanel changeModal={props.changeModal} handleFavoriteBtn={props.handleFavoriteBtn} />
      <SearchSortPanel beers={props.beers} searchHandler={props.searchHandler} onSortPanel={props.onSortPanel} />
    </header>
  );
}
