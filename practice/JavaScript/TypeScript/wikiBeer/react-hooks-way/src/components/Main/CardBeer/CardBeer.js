import React, { useState, useEffect } from "react";

export default function CardBeer(props) {
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    checkFavorite();
  });

  const checkFavorite = () => {
    if (localStorage.getItem(`favorite_${props.name}`)) {
      setFavorite(true);
    }
  }

  const updateFavorite = () => {
    if (localStorage.getItem(`favorite_${props.name}`)) {
      localStorage.removeItem(`favorite_${props.name}`)
      setFavorite(false);
    } else {
      localStorage.setItem(`favorite_${props.name}`, true)
      setFavorite(true);
    }
  }

  return (
    <article className="beer-card" style={props.cardStyle}>
      <h2 className="visually-hidden">Карточка товара "пива"</h2>
      <img className="beer-card__image" src={props.image} alt="Бутылка пива" />
      <div className="beer-card__wrapper">
        <p className="beer-card__name">{props.name}</p>
        <p className="beer-card__tagline">{props.tagline}</p>
        <p className="beer-card__abv">{props.abv}</p>
        <p className="beer-card__brewed">{props.first_brewed}</p>
      </div>
      <p className="beer-card__description">{props.description}</p>
      <input
        className="beer-card__favorite-checkbox"
        type="checkbox"
        checked={favorite}
        onChange={updateFavorite}
        title="В избранное"
      />
    </article>
  );
}
