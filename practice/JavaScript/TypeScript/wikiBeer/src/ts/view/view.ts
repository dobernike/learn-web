export default class View {
  popup: HTMLElement;
  overlay: HTMLElement;
  main: HTMLElement;
  pagination: HTMLElement;

  constructor() {
    this.popup = document.querySelector(".modal-login");
    this.overlay = document.querySelector(".modal-overlay");
    this.main = document.querySelector(".main");
    this.pagination = document.querySelector(".pagination__list");
  }

  showPopup() {
    this.popup.classList.add("modal-show");
    this.overlay.classList.add("modal-show");
  }

  closePopup() {
    this.popup.classList.remove("modal-show");
    this.overlay.classList.remove("modal-show");
  }

  singIn() {
    console.warn("Вы вошли!");
  }

  showCurrentPagination(currentPage: any) {
    const paginationItem = this.pagination.querySelector(".active");
    paginationItem.classList.remove("active");
    const paginationItems = this.pagination.children;
    paginationItems[currentPage].classList.add("active");
  }

  clearMain() {
    this.main.innerHTML = "";
  }

  fillMain(element: Element) {
    this.main.appendChild(element);
  }

  createCard(beer) {
    const card = document.createElement("article");
    card.className = "beer-card";

    const img = document.createElement("img");
    img.className = "beer-card__image";
    img.src = beer.img;
    card.appendChild(img);

    const wrapper = document.createElement("div");
    wrapper.className = "beer-card__wrapper";

    const name = document.createElement("p");
    name.className = "beer-card__name";
    name.innerText = "name: ";

    const beerName = document.createElement("span");
    beerName.className = "beer-card__beer-name";
    beerName.innerText = beer.name;

    name.appendChild(beerName);
    wrapper.appendChild(name);

    const tagline = document.createElement("p");
    tagline.className = "beer-card__tagline";
    tagline.innerText = "tagline: " + beer.tagline;
    wrapper.appendChild(tagline);

    const abv = document.createElement("p");
    abv.className = "beer-card__abv";
    abv.innerText = "abv: ";

    const beerAbv = document.createElement("span");
    beerAbv.className = "beer-card__beer-abv";
    beerAbv.innerText = beer.abv;

    abv.appendChild(beerAbv);
    wrapper.appendChild(abv);

    const brewed = document.createElement("p");
    brewed.className = "beer-card__brewed";
    brewed.innerText = "brewed: " + beer.brewed;
    wrapper.appendChild(brewed);
    card.appendChild(wrapper);

    const description = document.createElement("p");
    description.className = "beer-card__description";
    card.appendChild(description);
    description.innerText = "description: " + beer.description;

    const favorite = document.createElement("input");
    favorite.className = "beer-card__favorite-checkbox";
    favorite.type = "checkbox";
    favorite.title = "В избранное";

    if (localStorage.length > 0) {
      if (localStorage.getItem(`favorite_${beer.name}`)) {
        favorite.checked = true;
      } else {
        favorite.checked = false;
      }
    }
    card.appendChild(favorite);

    this.fillMain(card);

    return card; // for cache
  }

  removeStyle(element: HTMLElement) {
    element.removeAttribute("style");
  }

  setStyleSearch(element: HTMLElement) {
    element.setAttribute("style", "border-color: red; order: -1;");
  }

  createSearch() {
    const searchFlex = document.querySelector(".search-sort");
    const mockSearch = searchFlex.querySelector(".search");

    const search = document.createElement("form");
    search.className = "search";

    const input = document.createElement("input");
    input.type = "search";
    input.name = "search-input";
    input.setAttribute("list", "beer");
    input.required = true;

    const datalist = document.createElement("datalist");
    datalist.id = "beer";

    const submit = document.createElement("button");
    submit.className = "button button--red";
    submit.innerText = "Search";
    submit.type = "submit";
    submit.setAttribute("style", "margin-left: 10px");

    search.appendChild(input);
    search.appendChild(datalist);
    search.appendChild(submit);

    this.main.appendChild(search);
    searchFlex.replaceChild(search, mockSearch);
  }

  createOption(name: string) {
    const datalist = document.querySelector("#beer");
    const option = document.createElement("option");
    option.value = name;
    datalist.appendChild(option);
  }

  openFavorites(favoriteBtn: Element) {
    this.pagination.setAttribute("style", "visibility: hidden");
    favoriteBtn.innerText = `back`;
    favoriteBtn.setAttribute("style", "background-color: green");
  }

  closeFavorites(favoriteBtn: Element) {
    this.pagination.removeAttribute("style");
    favoriteBtn.innerText = `favorite`;
    favoriteBtn.removeAttribute("style");
  }

  showSortedCard(card: Element, index: number) {
    card.setAttribute("style", `order: ${index}`);
  }
}
