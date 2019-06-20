import React from 'react';
import './AnswerItem.css';

const AnswerItem = props => (
<li className={`AnswerItem`}>{props.answer.text}</li>
);

export default AnswerItem;
