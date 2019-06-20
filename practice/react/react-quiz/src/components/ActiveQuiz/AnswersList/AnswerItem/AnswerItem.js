import React from "react";
import "./AnswerItem.css";

const AnswerItem = props => (
  <li
    className={`AnswerItem`}
    onClick={() => props.onAnswerClick(props.answer.id)}
  >
    {props.answer.text}
  </li>
);

export default AnswerItem;
