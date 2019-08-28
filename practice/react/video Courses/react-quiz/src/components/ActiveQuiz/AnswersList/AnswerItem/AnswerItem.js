import React from "react";
import "./AnswerItem.css";

const AnswerItem = props => {
  const cls = [];
 
  if (props.state) {
    cls.push(props.state);
  }

  return (
    <li
      className={`AnswerItem ${cls.join(` `)}`}
      onClick={() => props.onAnswerClick(props.answer.id)}
    >
      {props.answer.text}
    </li>
  );
};

export default AnswerItem;
