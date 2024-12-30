import Model from "./model/model";
import View from "./view/view";
import Controller from "./controller/controller";

export default class Application {
  model: Model;
  view: View;
  controller: Controller;

  constructor() {
    this.model = new Model();
    this.view = new View();
    this.controller = new Controller(this.view, this.model);
  }

  start() {
    this.init();
    this.event();
  }

  init() {
    const beersJSON = this.model.getBeers();
    this.controller.handleBeers(beersJSON);
  }

  event() {
    // modal sing-in
    const singIn = document.querySelector(".main-header__sing-in");
    singIn.addEventListener("click", evt => {
      this.controller.handleLogin(evt);
    });

    const close = document.querySelector(".modal-login__button--close");
    close.addEventListener("click", evt => {
      this.controller.handleCloseLogin(evt);
    });

    const overlay = document.querySelector(".modal-overlay");
    overlay.addEventListener("click", evt => {
      this.controller.handleCloseLogin(evt);
    });

    window.addEventListener("keydown", evt => {
      if (evt.key === `Escape`) {
        this.controller.handleCloseLogin(evt);
      }
    });

    const form = document.querySelector(".modal-login__form");
    form.addEventListener("submit", evt => {
      this.controller.handleCloseLogin(evt);
      this.controller.handleSingIn();
    });

    // Pagination
    const pagination = document.querySelector(".pagination__list");
    pagination.addEventListener("click", evt => {
      this.controller.handlePagination(evt);
    });

    // Favorites
    const main = document.querySelector(".main");
    main.addEventListener("click", evt => {
      this.controller.favoriteHandler(evt);
    });

    const favoriteBtn = document.querySelector(".main-header__favorite");
    favoriteBtn.addEventListener("click", evt => {
      this.controller.handleFavoriteBtn(evt, favoriteBtn);
    });

    // Sorting
    const sortPanel = document.querySelector(".search-sort");
    sortPanel.addEventListener("click", evt => {
      this.controller.onSortPanel(evt);
    });
  }
}
