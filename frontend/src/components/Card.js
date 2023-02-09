
import React, { useState } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
      props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
}

  const currentUser = React.useContext(CurrentUserContext);
// Определяем, являемся ли мы владельцем текущей карточки
const isOwn = props.card.owner._id === currentUser?._id;

// Создаём переменную, которую после зададим в `className` для кнопки удаления
const cardDeleteButtonClassName = (
  `element__basket ${!isOwn && 'element__basket_hidden'}`
);

// Определяем, есть ли у карточки лайк, поставленный текущим пользователем
const isLiked = props.card.likes.some(i => i._id === currentUser?._id);

// Создаём переменную, которую после зададим в `className` для кнопки лайка
const cardLikeButtonClassName = `element__heart ${isOwn && 'element__heart_hidden'} ${isLiked && 'element__heart_active'}`;

  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="element">
      <img
        className="element__image"
        src={props.card.link}
        alt={props.card.name}
        onClick={handleClick}
      />
      <button type="button" className={cardDeleteButtonClassName} onClick={handleDeleteClick}></button>
      <div className="element__text">
        <h2 className="element__title">{props.card.name}</h2>
        <div className="element__likes">
          <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
          <p className="element__like-count">{props.card.likes.length}</p>
        </div>
      </div>
    </div>
    </CurrentUserContext.Provider>
  );
}

export default Card;
