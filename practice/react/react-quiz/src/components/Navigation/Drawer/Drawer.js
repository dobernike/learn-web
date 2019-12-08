import React, { Component } from "react";
import "./Drawer.css";
import { NavLink } from "react-router-dom";
import Backdrop from "../../UI/Backdrop/Backdrop";

class Drawer extends Component {
  clickHandler = () => {
    this.props.onClose();
  };

  renderLinks(links) {
    return links.map(({ to, label, exact }, idx) => {
      return (
        <li key={idx}>
          <NavLink to={to} exact={exact} onClick={this.clickHandler}>
            {label}
          </NavLink>
        </li>
      );
    });
  }

  render() {
    const cls = [`Drawer`];
    if (!this.props.isOpen) {
      cls.push(`close`);
    }
    // console.log(cls.values(`\\\`))
    const links = [{ to: "/", label: "Список", exact: true }];

    console.log('Auth', this.props.isAuthenticated);
    

    if (this.props.isAuthenticated) {
      links.push({ to: "/quiz-creator", label: "Создать тест", exact: false });
      links.push({ to: "/logout", label: "Выйти", exact: false });
    } else {
      links.push({ to: "/auth", label: "Авторизация", exact: false });
    }

    return (
      <React.Fragment>
        <nav className={cls.join(` `)}>
          <ul>{this.renderLinks(links)}</ul>
        </nav>
        {this.props.isOpen ? <Backdrop onClick={this.props.onClose} /> : null}
      </React.Fragment>
    );
  }
}

export default Drawer;
