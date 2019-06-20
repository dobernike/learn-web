import React from "react";
import "./AnswersList.css";
import AnswerItem from "./AnswerItem/AnswerItem";

const AnswersList = props => (
  <ul className={`AnswersList`}>
    {props.answers.map((answer, index) => (
      <AnswerItem answer={answer} key={index} onAnswerClick={props.onAnswerClick} />
    ))}
  </ul>
);

export default AnswersList;
