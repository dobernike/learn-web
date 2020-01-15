export function addTodo(text) {
  return {
    type: "ADD_TODO",
    text
  };
}

import * as actions from "../../actions/TodoActions";
import * as types from "../../constants/ActionTypes";
describe("actions", () => {
  it("should create an action to add a todo", () => {
    const text = "Finish docs";
    const expectedAction = {
      type: types.ADD_TODO,
      text
    };
    expect(actions.addTodo(text)).toEqual(expectedAction);
  });
});
