import "cross-fetch/polyfill";
function fetchTodosRequest() {
  return {
    type: FETCH_TODOS_REQUEST
  };
}
function fetchTodosSuccess(body) {
  return {
    type: FETCH_TODOS_SUCCESS,
    body
  };
}
function fetchTodosFailure(ex) {
  return {
    type: FETCH_TODOS_FAILURE,
    ex
  };
}
export function fetchTodos() {
  return dispatch => {
    dispatch(fetchTodosRequest());
    return fetch("http://example.com/todos")
      .then(res => res.json())
      .then(body => dispatch(fetchTodosSuccess(body)))
      .catch(ex => dispatch(fetchTodosFailure(ex)));
  };
}

import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as actions from "../../actions/TodoActions";
import * as types from "../../constants/ActionTypes";
import fetchMock from "fetch-mock";
import expect from "expect"; // You can use any testing library
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
describe("async actions", () => {
  afterEach(() => {
    fetchMock.restore();
  });
  it("creates FETCH_TODOS_SUCCESS when fetching todos has been done", () => {
    fetchMock.getOnce("/todos", {
      body: { todos: ["do something"] },
      headers: { "content-type": "application/json" }
    });
    const expectedActions = [
      { type: types.FETCH_TODOS_REQUEST },
      { type: types.FETCH_TODOS_SUCCESS, body: { todos: ["do something"] } }
    ];
    const store = mockStore({ todos: [] });
    return store.dispatch(actions.fetchTodos()).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
