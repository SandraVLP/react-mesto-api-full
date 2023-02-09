import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import React from "react";

function EditAvatarPopup (props) {
    const currentUser = React.useContext(CurrentUserContext);
    const avatarRef = React.useRef();


    function handleSubmit(e) {
        e.preventDefault();
      
        props.onUpdateAvatar({
          avatar: avatarRef.current.value
        });
      }


    return (
        <PopupWithForm
        name="popup_avatar"
        title="Обновить аватар"
        submitname="Сохранить"
        isOpen={props.isOpen}
        onClose={props.onClose}
        onSubmit={handleSubmit}
      >
        <fieldset className="popup__fieldset">
          <input
          ref={avatarRef}
            type="url"
            name="link"
            id="avatarlink"
            placeholder="Ссылка на картинку"
            className="popup__profile popup__input popup__profile_subtitle"
            required
          />
          <span id="avatarlink-error" className="popup__input-error"></span>
        </fieldset>
      </PopupWithForm>




    )


}

export default EditAvatarPopup;