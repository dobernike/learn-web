import React, { Component } from "react";
import "./QuizCreator.css";
import Button from "../../components/UI/Button/Button";

export default class QuizCreator extends Component {
  submitHandler = event => event.preventDefault();

  addQuestionHandler = () => {};

  createQuizHandler = () => {};

  render() {
    return (
      <div className="QuizCreator">
        <div>
          <h1>Quiz Creator</h1>

          <form onSubmit={this.submitHandler}>
            <input />
            <hr />
            <input />
            <input />
            <input />
            <input />
            <select />
            <Button type="primary" onClick={this.addQuestionHandler}>
              Добавить вопрос
            </Button>
            <Button type="success" onClick={this.createQuizHandler}>
              Создать тест
            </Button>
          </form>
        </div>
      </div>
    );
  }
}
