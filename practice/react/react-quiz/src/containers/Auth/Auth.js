import React, { Component } from "react";
import "./Auth.css";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";

export default class Auth extends Component {
  state = {
    formControls: {
      email: {
        value: "",
        type: "email",
        label: "Email",
        errorMessage: "Введите корректный email",
        valid: false,
        touched: false,
        validation: {
          required: true,
          email: true
        }
      },
      password: {
        value: "",
        type: "password",
        label: "Пароль",
        errorMessage: "Введите корректный пароль",
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 6
        }
      }
    }
  };

  loginHandler = () => {};

  registerHandler = () => {};

  submitHandler = event => event.preventDefault();

  onChangeHandler = (event, controlName) => {
    console.log(event.target.value, controlName);
  };

  renderInputs() {
    return Object.keys(this.state.formControls).map((controlName, idx) => {
      const control = this.state.formControls[controlName];
      return (
        <Input
          key={controlName + idx}
          type={control.type}
          value={control.value}
          label={control.label}
          errorMessage={control.errorMessage}
          valid={control.valid}
          touched={control.touched}
          shouldValidate={!!control.validation}
          onChange={event => this.onChangeHandler(event, controlName)}
        />
      );
    });
  }

  render() {
    return (
      <div className="Auth">
        <div>
          <h1>Авторизация</h1>
          <form className="AuthForm" onSubmit={this.submitHandler}>
            {this.renderInputs()}

            <Button type="success" onClick={this.loginHandler}>
              Войти
            </Button>
            <Button type="primary" onClick={this.registerHandler}>
              Регистрация
            </Button>
          </form>
        </div>
      </div>
    );
  }
}
