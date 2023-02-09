import { Children } from "react";

function InfoTooltip(props) {


  return (
    <div className={`popup popup_${props.name}` + (props.isOpen && " popup_active")}>
      <div className="popup__container popup__image-container">
        <button
          type="button"
          className="popup__close_element popup__close"
          onClick={props.onClose}
        ></button>
        {props.children}
      </div>
    </div>
  );
}

export default InfoTooltip;