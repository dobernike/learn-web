import React from "react";
import "./FinishedQuiz.css";
import { Link } from "react-router-dom";
import Button from "../UI/Button/Button";

const FinishedQuiz = props => {
  const successCount = Object.keys(props.results).reduce((total, key) => {
    if (props.results[key] === `success`) {
      total++;
    }
    return total;
  }, 0);

  return (
    <div className="FinishedQuiz">
      <ul>
        {props.quiz.map((it, idx) => {
          return (
            <li key={idx}>
              <strong>{idx + 1}</strong>.&nbsp;
              {it.question}
              <span className={props.results[idx]}>
                {props.results[idx] === `success` ? `+` : `x`}
              </span>
            </li>
          );
        })}
      </ul>

      <p>
        Правильно {successCount} из {props.quiz.length}
      </p>

      <div>
        <Button onClick={props.onRetry} type="primary">
          Повторить
        </Button>
        <Link to="/">
          <Button type="success">Перейти в список тестов</Button>
        </Link>
      </div>
    </div>
  );
};

export default FinishedQuiz;
