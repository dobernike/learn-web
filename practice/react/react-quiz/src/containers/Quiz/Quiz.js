import React, { Component } from "react";
import "./Quiz.css";
import { connect } from "react-redux";
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
import Loader from "../../components/UI/Loader/Loader";
import { fetchQuizById } from "./../../store/actions/quiz";

class Quiz extends Component {
  isQuizFinished() {
    return this.props.activeQuestion + 1 === this.props.quiz.length;
  }

  onAnswerClickHandler = answerId => {
    if (this.props.answerState) {
      const key = Object.keys(this.props.answerState)[0];
      if (this.props.answerState[key] === `success`) {
        return;
      }
    }

    const question = this.props.quiz[this.props.activeQuestion];
    const results = this.props.results;

    if (question.rightAnswerId === answerId) {
      if (!results[this.props.activeQuestion]) {
        results[this.props.activeQuestion] = "success";
      }
      this.setState({ answerState: { [answerId]: `success` }, results });

      const timeout = window.setTimeout(() => {
        if (this.isQuizFinished()) {
          this.setState({ isFinished: true });
        } else {
          this.setState({
            activeQuestion: this.props.activeQuestion + 1,
            answerState: null
          });
        }
        window.clearTimeout(timeout);
      }, 1000);
    } else {
      results[this.props.activeQuestion] = "error";
      this.setState({ answerState: { [answerId]: `error` } });
    }
  };

  retryHandler = () => {
    console.log(`click`);
    this.setState({
      results: {},
      isFinished: false,
      activeQuestion: 0,
      answerState: null
    });
  };

  async componentDidMount() {
    this.props.fetchQuizById(this.props.match.params.id);
  }

  render() {
    console.log(this.props);

    return (
      <div className="Quiz">
        <div className="QuizWrapper">
          <h1>Ответьте на все вопросы</h1>
          {this.props.loading || !this.props.quiz ? (
            <Loader />
          ) : this.props.isFinished ? (
            <FinishedQuiz
              results={this.props.results}
              quiz={this.props.quiz}
              onRetry={this.retryHandler}
            />
          ) : (
            <ActiveQuiz
              question={this.props.quiz[this.props.activeQuestion].question}
              answers={this.props.quiz[this.props.activeQuestion].answers}
              onAnswerClick={this.onAnswerClickHandler}
              quizLength={this.props.quiz.length}
              answerNumber={this.props.activeQuestion + 1}
              state={this.props.answerState}
            />
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    results: state.quiz.results, // {{id}: success error}
    isFinished: state.quiz.isFinished,
    activeQuestion: state.quiz.activeQuestion,
    answerState: state.quiz.answerState, // {[id]: `success' 'error;}
    quiz: state.quiz.quiz,
    loading: state.quiz.loading
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchQuizById: id => dispatch(fetchQuizById(id))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Quiz);
