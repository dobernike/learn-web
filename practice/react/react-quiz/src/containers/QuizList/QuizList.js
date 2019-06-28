import React, { Component } from "react";
import "./QuizList.css";
import { NavLink } from "react-router-dom";

export default class QuizList extends Component {
  renderQuizes() {
    return [1, 2, 3].map((quiz, idx) => {
      return (
        <li key={idx}>
          <NavLink to={"/quiz/" + quiz}>Тест {quiz}</NavLink>
        </li>
      );
    });
  }
  render() {
    return (
      <div className="QuizList">
        <div>
          <h1>Список тестов</h1>
          <ul>{this.renderQuizes()}</ul>
        </div>
      </div>
    );
  }
}
