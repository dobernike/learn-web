import { CREATE_QUIZ_QUESTION } from "./actionTypes";

export function createQuizQuestion(item) {
  return {
    type: CREATE_QUIZ_QUESTION,
    item
  };
}

export function finishCreateQuiz() {}
