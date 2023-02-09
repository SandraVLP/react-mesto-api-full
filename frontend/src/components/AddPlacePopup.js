import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import React from "react";

function AddPlacePopup(props) {
    const nameRef = React.useRef();
    const linkRef = React.useRef();
// const [name, setName] = useState('');
// const [link, setLink] = useState('');



function handleSubmit(e) {
    e.preventDefault();
  
    props.onAddPlace({
      name: nameRef.current.value,
      link: linkRef.current.value
    });
  }


return (
    <PopupWithForm
          name="popup_elements"
          title="Новое место"
          submitname="Создать"
          isOpen={props.isOpen}
          onClose={props.onClose}
          onSubmit={handleSubmit}
        >
          <fieldset className="popup__fieldset">
            <input
            ref={nameRef}
              type="text"
              name="name"
              id="imgname"
              placeholder="Название"
              minLength="2"
              maxLength="30"
              className="popup__profile popup__input popup__profile_title popup__profile_elements popup__profile_title_elements"
              required
            />
            <span id="imgname-error" className="popup__input-error"></span>
          </fieldset>
          <fieldset className="popup__fieldset">
            <input
            ref={linkRef}
              type="url"
              name="link"
              id="imglink"
              placeholder="Ссылка на картинку"
              className="popup__profile popup__input popup__profile_subtitle popup__profile_elements popup__profile_subtitle_elements"
              required
            />
            <span id="imglink-error" className="popup__input-error"></span>
          </fieldset>
        </PopupWithForm>
)

} 

export default AddPlacePopup;