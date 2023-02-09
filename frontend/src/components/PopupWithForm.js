function PopupWithForm(props) {
  return (
    <div
      className={
        `popup popup_${props.name}` + (props.isOpen && " popup_active")
      }
    >
      <form className="popup__container" name={props.name} noValidate onSubmit={props.onSubmit}>
        <button
          type="button"
          className="popup__close popup__close-profile"
          onClick={props.onClose}
        ></button>
        <h2 className="popup__title">{props.title}</h2>
        {props.children}
        <button type="submit" className="popup__save popup__save-profile">
          {props.submitname}
        </button>
      </form>
    </div>
  );
}

export default PopupWithForm;
