import { ADD_TODO } from "../constants/ActionTypes";
const initialState = [
  {
    text: "Use Redux",
    completed: false,
    id: 0
  }
];
export default function todos(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO:
      return [
        {
          id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
          completed: false,
          text: action.text
        },
        ...state
      ];
    default:
      return state;
  }
}

import reducer from "../../structuring-reducers/todos";
import * as types from "../../constants/ActionTypes";
describe("todos reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual([
      {
        text: "Use Redux",
        completed: false,
        id: 0
      }
    ]);
  });
  it("should handle ADD_TODO", () => {
    expect(
      reducer([], {
        type: types.ADD_TODO,
        text: "Run the tests"
      })
    ).toEqual([
      {
        text: "Run the tests",
        completed: false,
        id: 0
      }
    ]);
    expect(
      reducer(
        [
          {
            text: "Use Redux",
            completed: false,
            id: 0
          }
        ],
        {
          type: types.ADD_TODO,
          text: "Run the tests"
        }
      )
    ).toEqual([
      {
        text: "Run the tests",
        completed: false,
        id: 1
      },
      {
        text: "Use Redux",
        completed: false,
        id: 0
      }
    ]);
  });
});
