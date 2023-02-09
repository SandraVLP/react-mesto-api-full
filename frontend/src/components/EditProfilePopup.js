import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import React, { useState } from "react";



function EditProfilePopup(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = useState(currentUser?.name);
    const [description, setDescription] = useState(currentUser?.about);
    
    // После загрузки текущего пользователя из API
    // его данные будут использованы в управляемых компонентах.
    React.useEffect(() => {
      setName(currentUser?.name);
      setDescription(currentUser?.about);
    }, [currentUser]);



    function handleChangeName(e) {
        setName(e.target.value);
      }
    
    function handleChangeDescription(e) {
        setDescription(e.target.value);
    }
    
    function handleSubmit(e) {
      // Запрещаем браузеру переходить по адресу формы
      e.preventDefault();
    
      // Передаём значения управляемых компонентов во внешний обработчик
      props.onUpdateUser({
        name,
        about: description,
      });
    }
    

 return (
    <PopupWithForm
    name="popup_edit"
    title="Редактировать профиль"
    submitname="Сохранить"
    isOpen={props.isOpen}
    onClose={props.onClose}
    onSubmit={handleSubmit}
  >
    <fieldset className="popup__fieldset">
      <input
      value={name ?? ""}
        type="text"
        name={name} onChange={handleChangeName}
        id="username"
        placeholder="Имя"
        minLength="2"
        maxLength="40"
        className="popup__profile popup__profile_title popup__input"
        required
      />
      <span id="username-error" className="popup__input-error"></span>
    </fieldset>
    <fieldset className="popup__fieldset">
      <input
      value={description ?? ""}
        type="text"
        name={description} onChange={handleChangeDescription}
        id="about"
        placeholder="О себе"
        minLength="2"
        maxLength="200"
        className="popup__profile popup__profile_subtitle popup__input"
        required
      />
    </fieldset>
  </PopupWithForm>
 )
}

export default EditProfilePopup;