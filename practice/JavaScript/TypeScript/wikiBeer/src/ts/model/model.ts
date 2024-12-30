export default class Model {
  _apiBase: string;
  PAGE: { FIRST: number; current: number; LAST: number };
  cache: any[];
  lastTimeout: number;
  DEBOUNCE_INTERVAL: number;
  clicked: boolean;
  reverse: boolean;

  constructor() {
    this._apiBase = "https://api.punkapi.com/v2/";
    this.PAGE = {
      FIRST: 1,
      current: 1,
      LAST: 5
    };
    this.cache = [];
    this.lastTimeout = null;
    this.DEBOUNCE_INTERVAL = 500;
    this.clicked = false;
    this.reverse = false;
  }

  havePage(direction: string) {
    switch (direction) {
      case "left":
        return this.PAGE.current > this.PAGE.FIRST;
      case "right":
        return this.PAGE.current < this.PAGE.LAST;
      default:
        return;
    }
  }

  setPage(number: number) {
    return (this.PAGE.current += number);
  }

  setNumberPage = (number: number) => {
    return (this.PAGE.current = number);
  };

  async getBeers(currentPage: number = 1) {
    const url = `/beers?page=${currentPage}&per_page=6`;
    const res = await fetch(this._apiBase + url);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}` + `, received ${res.status}`);
    }

    return await res.json();
  }

  getCache() {
    return this.cache;
  }

  setCache(card: any) {
    this.cache.push(card);
  }

  checkFavorite(favorite: HTMLElement, beerName: HTMLElement) {

    if (!favorite.checked) {
      localStorage.removeItem(`favorite_${beerName}`);
    } else {
      localStorage.setItem(`favorite_${beerName}`, "true");
    }
  }

  showFavorite() {
    const newMain = new DocumentFragment();
    for (const item of this.cache) {
      const cacheItemName = item.querySelector(".beer-card__beer-name")
        .textContent;
      const favoriteCheck = item.querySelector(".beer-card__favorite-checkbox");

      if (localStorage.getItem(`favorite_${cacheItemName}`)) {
        favoriteCheck.checked = true; // Fixed bugs with no checked
        newMain.appendChild(item);
      }
    }
    return newMain;
  }

  getClicked() {
    return this.clicked;
  }

  setClicked(value: boolean) {
    this.clicked = value;
  }

  onSort(element: string, beerCards) {
    const beforeSorting = [];
    let afterSorting = [];

    beerCards.forEach(card => {
      const beerName = card.querySelector(`.beer-card__beer-${element}`)
        .textContent;
      beforeSorting.push(beerName);
    });
    if (isNaN(beforeSorting[0])) {
      afterSorting = beforeSorting.sort((a, b) =>
        // @ts-ignore
        this.reverse ? a < b : b < a
      );
    } else {
      afterSorting = beforeSorting.sort((a, b) =>
        this.reverse ? a - b : b - a
      );
    }
    this.reverse = !this.reverse;

    const cards = new Array(beerCards.length);

    beerCards.forEach(card => {
      const name: any = card.querySelector(`.beer-card__beer-${element}`);
      for (const index in afterSorting) {
        const sortName = afterSorting[index];
        if (name.textContent === sortName) {
          cards[index] = card;
          break;
        }
      }
    });

    return cards;
  }
}
