export const settings = {
    formSelector: '.popup__container',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save',
    inactiveButtonClass: 'popup__save_disabled',
    inputErrorClass: 'popup__input-error',
    errorClass: 'popup__error_visible'
  };


const popupAddCard = document.querySelector(".popup_elements");

const popupEditProfile = document.querySelector(".popup_edit");
const popups = document.querySelectorAll(".popup");

export const buttonOpenEditProfilePopup = document.querySelector(".profile__button-add");
export const buttonOpenAddCardPopup = document.querySelector(".profile__button-edit");
export const buttonOpenEditAvatarPopup = document.querySelector(".profile__button-change");



const popupCloseButtons = document.querySelectorAll(".popup__close");
const buttonCloseEditProfile = document.querySelector(".popup__close-profile")
const buttonCloseAddImage = document.querySelector(".popup__close_elements");
const buttonCloseImage = document.querySelector(".popup__close_element");

const newCardTitleInput = document.querySelector(".popup__profile_title_elements");
const newCardLinkInput = document.querySelector(".popup__profile_subtitle_elements");
/* const title = document.querySelector(".profile__title");
const subtitle = document.querySelector(".profile__subtitle"); */
export const profileNameInput = document.querySelector(".popup__profile_title");
export const profileInfoInput = document.querySelector(".popup__profile_subtitle");
/* export const cards = document.querySelector('.cards'); */
export const cardContainer = document.querySelector(".popup__container_elements");
export const popupContainer = document.querySelector(".popup__container");
export const avatarContainer = document.querySelector(".popup__container_avatar");
const avatarImage = document.querySelector(".profile__avatar");


/*
export  const items = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ]; */