import React from "react";
import "./FinishedQuiz.css";

const FinishedQuiz = props => (
  <div className="FinishedQuiz">
    <ul>
      <li>
        <strong>1. </strong>
        How are you?
        <i className="error">&times;</i>
      </li>
      <li>
        <strong>2. </strong>
        How are you?
        <i className="success">+</i>
      </li>
    </ul>

    <p>Правильно 4 из 10</p>

    <div>
      <button type="button">Повторить</button>
    </div>
  </div>
);

export default FinishedQuiz;
