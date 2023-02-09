function ImagePopup(props) {


  return (
    <div className={`popup popup_element` + (props.card && " popup_active")}>
      <div className="popup__image-container">
        <button
          type="button"
          className="popup__close_element popup__close"
          onClick={props.onClose}
        ></button>
        <img
          className="popup__image"
          src={props.card?.link}
          alt={props.card?.name}
        />
        <p className="popup__image-title">{props.card?.name}</p>
      </div>
    </div>
  );
}

export default ImagePopup;
