import axios from "../../axios/axios-quiz";
import {
  FETCH_QUIZES_START,
  FETCH_QUIZES_SUCCESS,
  FETCH_QUIZES_ERROR,
  FETCH_QUIZ_SUCCESS,
  QUIZ_SET_STATE,
  QUIZ_FINISH,
  QUIZ_NEXT_QUESTION,
  QUIZ_RETRY
} from "./actionTypes";

export function fetchQuizes() {
  return async dispatch => {
    dispatch(fetchQuizesStart());
    try {
      const response = await axios.get(`/quizes.json`);

      const quizes = [];

      Object.keys(response.data).forEach((key, idx) => {
        quizes.push({
          id: key,
          name: `Тест № ${idx + 1}`
        });
      });

      dispatch(fetchQuizesSuccess(quizes));
    } catch (e) {
      dispatch(fetchQuizesError(e));
    }
  };
}

export function fetchQuizesStart() {
  return {
    type: FETCH_QUIZES_START
  };
}

export function fetchQuizesSuccess(quizes) {
  return {
    type: FETCH_QUIZES_SUCCESS,
    quizes
  };
}

export function fetchQuizesError(e) {
  return {
    type: FETCH_QUIZES_ERROR,
    error: e
  };
}

export function fetchQuizById(quizId) {
  return async dispatch => {
    dispatch(fetchQuizesStart());

    try {
      const response = await axios.get(`/quizes/${quizId}.json`);
      const quiz = response.data;

      dispatch(fetchQuizSuccess(quiz));
    } catch (e) {
      dispatch(fetchQuizesError(e));
    }
  };
}

export function fetchQuizSuccess(quiz) {
  return {
    type: FETCH_QUIZ_SUCCESS,
    quiz
  };
}

export function quizAnswerClick(answerId) {
  return (dispatch, getState) => {
    const state = getState().quiz;

    if (state.answerState) {
      const key = Object.keys(state.answerState)[0];
      if (state.answerState[key] === `success`) {
        return;
      }
    }

    const question = state.quiz[state.activeQuestion];
    const results = state.results;

    if (question.rightAnswerId === answerId) {
      if (!results[state.activeQuestion]) {
        results[state.activeQuestion] = "success";
      }
      dispatch(quizSetState({ [answerId]: `success` }, results));

      const timeout = window.setTimeout(() => {
        if (isQuizFinished(state)) {
          dispatch(quizFinish());
        } else {
          dispatch(quizNextQuestion(state.activeQuestion + 1));
        }
        window.clearTimeout(timeout);
      }, 1000);
    } else {
      results[state.activeQuestion] = "error";
      dispatch(quizSetState({ [answerId]: `error` }, results));
    }
  };
}

function isQuizFinished(state) {
  return state.activeQuestion + 1 === state.quiz.length;
}

export function quizSetState(answerState, results) {
  return {
    type: QUIZ_SET_STATE,
    answerState,
    results
  };
}

export function quizFinish() {
  return {
    type: QUIZ_FINISH
  };
}

export function quizNextQuestion(number) {
  return {
    type: QUIZ_NEXT_QUESTION,
    number
  };
}

export function retryQuiz() {
  return {
    type: QUIZ_RETRY
  };
}
