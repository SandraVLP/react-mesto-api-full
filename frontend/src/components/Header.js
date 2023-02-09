import logo from "../images/logo.svg";
import React, { useState } from "react";
import { Link, Routes, Route } from "react-router-dom";

import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Header(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип" />
      <Routes>
        <Route
          path="*"
          element={
            <div className="header__container">
              {" "}
              <p className="header__email">{props.email}</p>{" "}
              <button onClick={props.signOut} className="header__link">
                Выйти
              </button>
            </div>
          }
        />

        <Route
          path="/signup"
          element={
            <Link to="/signin" className="header__login">
              Войти{" "}
            </Link>
          }
        />

        <Route
          path="/signin"
          element={
            <Link to="/signup" className="header__login">
              Регистрация{" "}
            </Link>
          }
        />
      </Routes>
    </header>
  );
}

export default Header;
