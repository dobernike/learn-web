import React, { useState } from "react";
import "./App.css";
import getBeers from '../../service/getBeers';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import Modal from "../Modal/Modal";

const COUNT_CARDS = 6;
const DEBOUNCE_INTERVAL = 500;
const cache = [];

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [beers, setBeers] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [reverse, setReverse] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [paginationOpen, setPaginationOpen] = useState(true);
  const [PAGE, setPage] = useState({
    FIRST: 1,
    current: 1,
    LAST: 5
  });

  let lastTimeout = null;

  // Modal
  const changeModal = evt => {
    evt.preventDefault();
    setModalOpen(prevModalOpen => !prevModalOpen);
  };

  const submitHadle = evt => {
    changeModal(evt);
    console.warn("Вы вошли!");
  }
  // Cards
  const updateCards = (currentPage = 1, cardsPerPage = COUNT_CARDS) => {
    getBeers(currentPage, cardsPerPage).then(fetchBeers => setBeers(fetchBeers));
  }

  if (beers.length === 0) updateCards();

  // Search
  const searchHandler = evt => {
    evt.preventDefault();
    const search = evt.target[0];

    setSearchName(search.value);
  }

  // Sort
  const onSort = (element) => {
    const beforeSorting = [];
    let afterSorting = [];

    beers.forEach(card => {
      const beerName = card[element]
      beforeSorting.push(beerName);
    });

    if (isNaN(beforeSorting[0])) {
      afterSorting = beforeSorting.sort((a, b) =>
        reverse ? a < b : b < a
      );
    } else {
      afterSorting = beforeSorting.sort((a, b) =>
        reverse ? a - b : b - a
      );
    }
    setReverse(prevReverse => !prevReverse);
    const cards = new Array(beers.length);

    beers.forEach(card => {
      const name = card[element]
      for (const index in afterSorting) {
        const sortName = afterSorting[index];
        if (name === sortName) {
          cards[index] = card;
          break;
        }
      }
    });
    setBeers(cards);
  }

  // Pagination
  const handlePagination = (evt) => {
    evt.preventDefault();
    const target = evt.target;

    if (target.tagName !== "A") return;

    if (target.innerText === "left") {
      const havePage = hasPage(target.innerText);
      return havePage ? debounce(changePage, -1) : null;
    } else if (target.innerText === "right") {
      const havePage = hasPage(target.innerText);
      return havePage ? debounce(changePage, +1) : null;
    } else return debounce(setNumberPage, +target.innerText);
  }

  const hasPage = (direction) => {
    switch (direction) {
      case "left":
        return PAGE.current > PAGE.FIRST;
      case "right":
        return PAGE.current < PAGE.LAST;
      default:
        return;
    }
  }

  const changePage = (number) => {
    return (PAGE.current += number);
  }

  const setNumberPage = (number) => {
    return (PAGE.current = number);
  };

  const debounce = (updatePage, target) => {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(() => {
      const currentPage = updatePage(target);

      setPage({ ...PAGE, ...PAGE.current = currentPage });

      updateCards(currentPage);
    }, DEBOUNCE_INTERVAL);
  };

  // Cache
  const handleCache = (card) => {
    const beerName = card.name;

    if (cache.length !== 0) {
      for (const item of cache) {
        const cacheItemName = item.name;
        if (cacheItemName === beerName) return;
      }
    }
    cache.push(card);
  }

  // Favorites
  const handleFavoriteBtn = evt => {
    evt.preventDefault();
    const favoriteBtn = evt.target;

    if (!clicked) {
      setClicked(true);

      setPaginationOpen(false);
      favoriteBtn.innerText = `back`;
      favoriteBtn.setAttribute("style", "background-color: green");

      const newMain = showFavorite();

      setBeers(newMain);
    } else {
      setClicked(false);

      setPaginationOpen(true);
      favoriteBtn.innerText = `favorite`;
      favoriteBtn.removeAttribute("style");

      updateCards();
    }
  }

  const showFavorite = () => {
    const newMain = [];
    for (const item of cache) {
      const cacheItemName = item.name;

      if (localStorage.getItem(`favorite_${cacheItemName}`)) {
        newMain.push(item);
      }

    }
    return newMain;
  }

  return (
    <>
      <Header changeModal={changeModal} beers={beers} searchHandler={searchHandler} onSortPanel={onSort} handleFavoriteBtn={handleFavoriteBtn} />
      <Main beers={beers} searchName={searchName} handleCache={handleCache} />
      <Footer handlePagination={handlePagination} page={PAGE} isOpen={paginationOpen} />
      <Modal isOpen={modalOpen} onClose={changeModal} onSubmit={submitHadle} />
    </>
  );
}

