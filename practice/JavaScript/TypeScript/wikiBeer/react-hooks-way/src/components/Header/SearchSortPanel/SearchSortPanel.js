import React from "react";
import SearchItem from "./SearchItem/SearchItem";

export default function SearchSortPanel(props) {
  return (
    <section className="search-sort container">
      <h1 className="visually-hidden">Поиск и сортировка</h1>

      {/* Search */}
      <form className="search" action="#" onSubmit={props.searchHandler}>
        <input type="search" list="beer" name="searchValue" />
        <datalist id="beer">
          {props.beers.map((beer, index) => {
            return <SearchItem key={beer.name + index} value={beer.name} />
          })}

        </datalist>
        <button className="button button--red" type="submit" style={{ marginLeft: 10 }} >Search</button>
      </form>

      {/* Sort */}
      <div className="sort">
        <button
          className="button button--red button__sort button__sort--name"
          type="button" onClick={() => props.onSortPanel(`name`)}>
          Sort name
        </button>
        <button
          className="button button--red button__sort button__sort--abv"
          type="button" onClick={() => props.onSortPanel(`abv`)}>
          Sort abv
        </button>
      </div>
    </section>
  );
}
