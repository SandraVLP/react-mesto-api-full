import React from "react";
import { Link } from "react-router-dom";
import InfoTooltip from "./InfoTooltip";
import * as auth from "../utils/auth.js";
import iconSuccess from "../images/Union.svg";
import iconDenied from "../images/denied.svg";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      tipOpen: false,
      isSuccess: false,
      errorMessage: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    // здесь обработчик регистрации
    this.props.onRegister(this.state.password, this.state.email);
  };


  render() {
    return (
      <>
        <div className="enter enter_register">
          <p className="enter__welcome">Регистрация</p>
          <form onSubmit={this.handleSubmit} className="enter__form ">
            <label htmlFor="email">Email:</label>
            <input
              className="enter__input"
              placeholder="Email"
              id="email"
              name="email"
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
            <label htmlFor="password">Пароль:</label>
            <input
              className="enter__input"
              placeholder="Пароль"
              id="password"
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
            <div className="enter__button-container">
              <button
                type="submit"
                onSubmit={this.handleSubmit}
                className="enter__button"
              >
                Зарегистрироваться
              </button>
            </div>
          </form>
          <div className="enter__signin">
            <Link to="/signin" className="enter__login-link">
              Уже зарегистрированы? Войти
            </Link>
          </div>
        </div>
        {/* {this.state.tipOpen && (
          <InfoTooltip
            isOpen={this.state.tipOpen}
            name="tip "
            onClose={() => this.handleTipClose()}
          >
            <img
              className="popup__icon"
              src={this.state.isSuccess ? iconSuccess : iconDenied}
              alt={this.state.isSuccess ? "Успех" : "Неудача"}
            />
            <p className="popup__icon-title">
              {this.state.isSuccess
                ? "Вы успешно зарегистрировались!"
                : this.state.errorMessage}
            </p>
          </InfoTooltip>
        )} */}
      </>
    );
  }
}

export default Register;
