import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import React, { useState } from "react";
import { Route, useNavigate, Navigate, Routes } from "react-router-dom";
import api from "../utils/Api.js";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import * as auth from "../utils/auth";
import iconSuccess from "../images/Union.svg";
import iconDenied from "../images/denied.svg";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setisAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setisEditAvatarPopupOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isInfoToolTipOpen, setisInfoToolTipOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [icon, setIcon] = useState(null);
  const navigate = useNavigate();

  function closeAllPopups() {
    setisEditAvatarPopupOpen(false);
    setisAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setisInfoToolTipOpen(false);
    setSelectedCard(null);
  }

  function handleCardClick(selectedCard) {
    setSelectedCard(selectedCard);
  }

  function handleUpdateUser(data) {
    api
      .setProfileData(data)
      .then((profile) => {
        setCurrentUser(profile);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка; ${err}`);
      });
  }

  function handleUpdateAvatar(data) {
    api
      .setUserAvatar(data)
      .then((profile) => {
        setCurrentUser(profile);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка; ${err}`);
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
        setCards(newCards);
      })
      .catch((err) => {
        console.log(`Ошибка; ${err}`);
      });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        const newCards = cards.filter((c) => (c._id !== card._id ? c : null));
        setCards(newCards);
      })
      .catch((err) => {
        console.log(`Ошибка; ${err}`);
      });
  }

  function handleAddPlaceSubmit(data) {
    api
      .setNewCards(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка; ${err}`);
      });
  }

  function signOut() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    navigate("/signin");
  }

  const handleTokenCheck = () => {
    if (localStorage.getItem("jwt")) {
      const jwt = localStorage.getItem("jwt");

      // проверяем токен пользователя
      auth
        .checkToken(jwt)
        .then((res) => {
          if (res) {
            setEmail(res.data.email);
            setLoggedIn(true);
            navigate("/");
          }
        })
        .catch((err) => {
          console.log(`Ошибка; ${err}`);
        });
    }
  };

  function handleErrorMessages(err) {
    if (err === 400) {
      setErrorMessage("некорректно заполнено одно из полей ");
    }
    if (err === 401) {
      setErrorMessage("Пользователь с email не найден ");
    }
  }

  const handleLogin = (email, password) => {
    auth
      .authorize(email, password)
      .then((data) => {
        if (data.token) {
          handleTokenCheck();
          navigate("*");
        }
      })
      .catch((err) => {
        handleErrorMessages(err);
        setIcon(iconDenied);
        setIsSuccess(false);
        setisInfoToolTipOpen(true);
      });
  };

  function handleRegister(password, email) {
    auth
      .register(password, email)
      .then((res) => {
        if (res) {
          setIsSuccess(true);
          setIcon(iconSuccess);
          setErrorMessage(null);
          setisInfoToolTipOpen(true);
        }
      })
      .catch((err) => {
        setIsSuccess(false);
        setIcon(iconDenied);
        handleErrorMessages(err);
        setisInfoToolTipOpen(true);
      });
  }

  React.useEffect(() => {
    handleTokenCheck();
  }, []);

  React.useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getInitialCards()])
        .then(([cards]) => {
          setCards(cards);
        })
        .catch((err) => {
          console.log(`Ошибка; ${err}`);
        });
    }
  }, [loggedIn]);

  React.useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getProfileData()])
        .then(([profile]) => {
          setCurrentUser(profile);
        })
        .catch((err) => {
          console.log(`Ошибка; ${err}`);
        });
    }
  }, [loggedIn]);

  return (
    <div className="App">
      <CurrentUserContext.Provider value={currentUser}>
        <Header email={email} signOut={signOut} />
        <Routes>
          <Route
            path="*"
            element={
              <ProtectedRoute
                hasAccess={loggedIn}
                component={Main}
                onEditAvatar={() => setisEditAvatarPopupOpen(true)}
                onEditProfile={() => setIsEditProfilePopupOpen(true)}
                onAddPlace={() => setisAddPlacePopupOpen(true)}
                onCardClick={(selectedCard) => handleCardClick(selectedCard)}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                cards={cards}
              />
            }
          />
          <Route
            path="/signup"
            element={<Register onRegister={handleRegister} />}
          />
          <Route path="/signin" element={<Login onLogin={handleLogin} />} />
          <Route
            path="*"
            element={loggedIn ? <Navigate to="*" /> : <Navigate to="/signin" />}
          ></Route>
        </Routes>

        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        {/* 
    <PopupWithForm 
    name='popup_sure' 
    title='Обновить Вы уверены?' 
    submitname='Да'
    isOpen={}
    /> */}
        <ImagePopup card={selectedCard} onClose={() => closeAllPopups(true)} />
       
          <InfoTooltip
            isOpen={isInfoToolTipOpen}
            name="tip "
            onClose={() => closeAllPopups(true)}
          >
            {/* <img
              className="popup__icon"
              src={isSuccess ? iconSuccess : iconDenied}
              alt={isSuccess ? "Успех" : "Неудача"}
            /> */}
                        <img
              className="popup__icon"
              src={icon}
              alt={isSuccess ? "Успех" : "Неудача"}
            />

            <p className="popup__icon-title">
              {isSuccess ? "Вы успешно зарегистрировались!" : errorMessage}
            </p>
          </InfoTooltip>
        )
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;

