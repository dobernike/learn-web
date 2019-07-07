import { ADD, SUB, ADD_NUMBER, ADD2 } from "./actionTypes";

export function add() {
  return {
    type: ADD
  };
}

export function sub() {
  return {
    type: SUB
  };
}

export function addNumber(number) {
  return {
    type: ADD_NUMBER,
    payload: number
  };
}

export function add2(number) {
  return {
    type: ADD2,
    payload: number
  };
}
