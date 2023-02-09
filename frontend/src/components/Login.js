import React from "react";
// import { useNavigate } from 'react-router-dom';
import InfoTooltip from "./InfoTooltip";
import iconDenied from "../images/denied.svg";
import * as auth from "../utils/auth.js";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        email: '',
        password: '',
      tipOpen: false,
      errorMessage: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }


  handleSubmit(e) {
    e.preventDefault();
    // здесь обрабатываем вход в систему
    if (!this.state.email || !this.state.password) {
      this.setState({
        errorMessage: "Что-то пошло не так! Попробуйте ещё раз",
        tipOpen: true,
      });
      return;
    }
    this.props.onLogin(this.state.email,this.state.password);
  }
  render() {
    return (
      <>
        <div className="enter enter_login">
          <p className="enter__welcome">Вход</p>
          <form onSubmit={this.handleSubmit} className="enter__form">
            <input
              required
              className="enter__input"
              placeholder="Email"
              id="email"
              name="email"
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
            <input
              required
              className="enter__input"
              placeholder="Пароль"
              id="password"
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
            <div className="enter__button-container">
              <button type="submit" className="enter__button">
                Войти
              </button>
            </div>
          </form>
        </div>
        {/* {this.state.tipOpen && (
          <InfoTooltip
            isOpen={this.state.tipOpen}
            name="tip "
            onClose={() => this.handleTipClose()}
          >
            <img className="popup__icon" src={iconDenied} alt={"Неудача"} />
            <p className="popup__icon-title">{this.state.errorMessage}</p>
          </InfoTooltip>
        )} */}
      </>
    );
  }
}

export default Login;
