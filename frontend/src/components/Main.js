import React, { useState } from "react";
import api from "../utils/Api.js";
import Card from "./Card";
import pencil from "../images/pencil.svg";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <div className="profile__info">
          <button type="submit" className="profile__button-change">
            <img
              className="profile__avatar"
              src={currentUser?.avatar}
              alt="Аватар"
              onClick={props.onEditAvatar}
            />
            <img className="profile__pencil" src={pencil} alt="Карандаш" />
          </button>
          <div className="profile__text">
            <div className="profile__edit">
              <h1 className="profile__title">{currentUser?.name}</h1>
              <button
                type="button"
                className="profile__button-add"
                onClick={props.onEditProfile}
              ></button>
            </div>
            <p className="profile__subtitle">{currentUser?.about}</p>
          </div>
        </div>
        <button
          className="profile__button-edit"
          onClick={props.onAddPlace}
        ></button>
      </section>
      <section className="cards">
        {props.cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            id={currentUser?._id}
            owner={currentUser?._id}
            onCardClick={props.onCardClick}
            onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete}
          />
        ))}
      </section>
    </main>
  );
}
export default Main;
