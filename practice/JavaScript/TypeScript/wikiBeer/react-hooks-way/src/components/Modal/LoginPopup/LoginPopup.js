import React from "react";

export default function LoginPopup(props) {
  return (
    <div className="modal modal-login">
      <h2 className="modal-login__title">Личный кабинет</h2>
      <p className="modal-login__text">
        Введите свой логин и пароль, чтобы войти
      </p>
      <form className="modal-login__form" action="#" onSubmit={props.onSubmit} method="post">
        <p className="modal-login__item">
          <label className="visually-hidden" htmlFor="user-name">
            Имя
          </label>
          <input
            type="text"
            className="modal-login__input"
            id="user-name"
            name="login"
            placeholder="Имя..."
            autoComplete="on"
            required
          />
        </p>
        <p className="modal-login__item">
          <label className="visually-hidden" htmlFor="user-email">
            Email
          </label>
          <input
            type="email"
            className="modal-login__input"
            id="user-email"
            name="email"
            placeholder="Email..."
            autoComplete="on"
            required
          />
        </p>
        <p className="modal-login__item">
          <label className="visually-hidden" htmlFor="user-password">
            Пароль
          </label>
          <input
            type="password"
            className="modal-login__input"
            id="user-password"
            name="password"
            placeholder="Пароль..."
            minLength="6"
            maxLength="12"
            autoComplete="on"
            required
          />
        </p>
        <button
          className="modal-login__button modal-login__button--submit button button--red"
          type="submit"
        >
          Войти
        </button>
        <button
          className="modal-login__button 
modal-login__button--close button"
          type="button"
          onClick={props.onClose}
        >
          Закрыть
        </button>
      </form>
    </div>
  );
}
