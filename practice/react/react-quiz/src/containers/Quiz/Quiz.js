import React, { Component } from "react";
import "./Quiz.css";
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";

class Quiz extends Component {
  state = {
    quiz: [
      {
        question: `Какого цвета небо?`,
        rightAnswerId: 2,
        answers: [
          { text: `Черный`, id: 1 },
          { text: `Синий`, id: 2 },
          { text: `Красный`, id: 3 },
          { text: `Зеленый`, id: 4 }
        ]
      }
    ]
  };

  onAnswerClickHandler = answerId => {
    console.log(`click`, answerId);
  };

  render() {
    return (
      <div className="Quiz">
        <div className="QuizWrapper">
          <h1>Ответьте на все вопросы</h1>
          <ActiveQuiz answers={this.state.quiz[0].answers} onAnswerClick={this.onAnswerClickHandler} />
        </div>
      </div>
    );
  }
}

export default Quiz;
