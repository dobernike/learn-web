import React, { Component } from "react";
import "./Quiz.css";
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";

class Quiz extends Component {
  state = {
    activeQuestion: 0,
    answerState: null, // {[id]: `success' 'error;}
    quiz: [
      {
        question: `Какого цвета небо?`,
        rightAnswerId: 2,
        id: 1,
        answers: [
          { text: `Черный`, id: 1 },
          { text: `Синий`, id: 2 },
          { text: `Красный`, id: 3 },
          { text: `Зеленый`, id: 4 }
        ]
      },
      {
        question: `В каком году основали СПБ?`,
        rightAnswerId: 3,
        id: 2,
        answers: [
          { text: `1700`, id: 1 },
          { text: `1705`, id: 2 },
          { text: `1703`, id: 3 },
          { text: `1803`, id: 4 }
        ]
      }
    ]
  };

  isQuizFinished() {
    return this.state.activeQuestion + 1 === this.state.quiz.length;
  }

  onAnswerClickHandler = answerId => {
    const question = this.state.quiz[this.state.activeQuestion];

    if (question.rightAnswerId === answerId) {
      this.setState({ answerState: { [answerId]: `success` } });

      const timeout = window.setTimeout(() => {
        if (this.isQuizFinished()) {
          console.log(`end`);
        } else {
          this.setState({
            activeQuestion: this.state.activeQuestion + 1,
            answerState: null
          });
        }
        window.clearTimeout(timeout);
      }, 1000);
    } else {
      this.setState({ answerState: { [answerId]: `error` } });
    }
  };

  render() {
    return (
      <div className="Quiz">
        <div className="QuizWrapper">
          <h1>Ответьте на все вопросы</h1>
          <ActiveQuiz
            question={this.state.quiz[this.state.activeQuestion].question}
            answers={this.state.quiz[this.state.activeQuestion].answers}
            onAnswerClick={this.onAnswerClickHandler}
            quizLength={this.state.quiz.length}
            answerNumber={this.state.activeQuestion + 1}
            state={this.state.answerState}
          />
        </div>
      </div>
    );
  }
}

export default Quiz;
