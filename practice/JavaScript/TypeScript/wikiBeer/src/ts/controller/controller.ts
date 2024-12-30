export default class Controller {
  view: any;
  model: any;

  constructor(view: any, model: any) {
    this.view = view;
    this.model = model;
  }

  // Popup
  handleLogin(evt: Event) {
    evt.preventDefault();
    this.view.showPopup();
  }

  handleCloseLogin(evt: Event) {
    evt.preventDefault();
    this.view.closePopup();
  }

  handleSingIn() {
    this.view.singIn();
  }

  // Pagination
  handlePagination(evt: Event) {
    evt.preventDefault();
    const target = evt.target as HTMLElement;

    if (target.tagName !== "A") return;

    if (target.innerText === "left") {
      const havePage = this.model.havePage(target.innerText);
      havePage ? this.debounce(this.setPage, -1) : null;
    } else if (target.innerText === "right") {
      const havePage = this.model.havePage(target.innerText);
      havePage ? this.debounce(this.setPage, +1) : null;
    } else this.debounce(this.setNumberPage, +target.innerText);
    return;
  }

  debounce = (updatePage: Function, target: number) => {
    if (this.model.lastTimeout) {
      window.clearTimeout(this.model.lastTimeout);
    }
    this.model.lastTimeout = window.setTimeout(() => {
      const currentPage = updatePage(target);
      this.view.showCurrentPagination(currentPage);
      const beersJSON = this.model.getBeers(currentPage);
      this.handleBeers(beersJSON);
    }, this.model.DEBOUNCE_INTERVAL);
  };

  setPage = (target: number) => this.model.setPage(target);

  setNumberPage = (target: number) => this.model.setNumberPage(target);

  handleBeers(beersJSON: any) {
    this.view.clearMain();

    beersJSON.then((beersJSON: any) => {
      const beers = beersJSON.map(this._transformBeers);
      const beersNames = [];
      beers.forEach((beer: any) => {
        beersNames.push(beer.name);
        const card = this.view.createCard(beer);
        this.handleCache(card);
      });

      this.createSearch(beersNames);
    });
  }

  _transformBeers(beer: any) {
    return {
      img: beer.image_url,
      name: beer.name,
      tagline: beer.tagline,
      abv: beer.abv,
      brewed: beer.first_brewed,
      description: beer.description
    };
  }

  // Cache
  handleCache(card: Element) {
    const cache = this.model.getCache();
    const beerName = card.querySelector(".beer-card__beer-name").textContent;

    if (cache.length !== 0) {
      for (const item of cache) {
        const cacheItemName = item.querySelector(".beer-card__beer-name")
          .textContent;

        if (cacheItemName === beerName) {
          return;
        }
      }
    }
    this.model.setCache(card);
  }

  // Search
  createSearch = (beersNames: string[]) => {
    const main = document.querySelector(".main");

    const searchHandler = (evt: MouseEvent) => {
      evt.preventDefault();
      const search = evt.target[0] as HTMLElement;

      if (beersNames.includes(search.value)) {
        const beerCards = main.children;

        for (const beerCard of beerCards) {
          this.view.removeStyle(beerCard);

          const cardName = beerCard.querySelector(`.beer-card__name`);
          if (cardName.textContent === `name: ${search.value}`) {
            this.view.setStyleSearch(beerCard);
          }
        }
      }
    };

    const searchFlex = document.querySelector(".search-sort");
    const mockSearch = searchFlex.querySelector(".search");
    mockSearch.removeEventListener("submit", searchHandler);

    this.view.createSearch();

    beersNames.forEach(name => {
      this.view.createOption(name);
    });

    const search = document.querySelector(".search");
    search.addEventListener("submit", searchHandler);
  };

  favoriteHandler(evt: Event) {
    const favorite = evt.target as HTMLElement;
    if (favorite.tagName !== "INPUT") {
      return;
    }
    const beerName = favorite.parentElement.querySelector(
      ".beer-card__beer-name"
    ).textContent;
    this.model.checkFavorite(favorite, beerName);
  }

  handleFavoriteBtn(evt: Event, favoriteBtn: Element) {
    evt.preventDefault();
    if (!this.model.getClicked()) {
      this.model.setClicked(true);
      this.view.openFavorites(favoriteBtn);

      const newMain = this.model.showFavorite();

      this.view.clearMain();
      this.view.fillMain(newMain);
    } else {
      this.model.setClicked(false);
      this.view.closeFavorites(favoriteBtn);

      const beersJSON = this.model.getBeers(this.model.PAGE.current);
      this.handleBeers(beersJSON);
    }
  }

  onSortPanel(evt: Event) {
    const target = evt.target as HTMLElement;

    if (!target.classList.contains("button__sort")) {
      return;
    }
    evt.preventDefault();
    if (target.classList.contains("button__sort")) {
      const classes = target.className;

      const regexp = /sort--(.*)/;
      const element = classes.match(regexp)[1];

      const beerCards = document.querySelectorAll(".beer-card");
      const cards = this.model.onSort(element, beerCards);
      cards.forEach((card: Element, index: number) =>
        this.view.showSortedCard(card, index)
      );
    }
  }
}
