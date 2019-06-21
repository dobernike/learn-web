import React from "react";
import "./FinishedQuiz.css";

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
        <button type="button" onClick={props.onRetry}>Повторить</button>
      </div>
    </div>
  );
};

export default FinishedQuiz;
