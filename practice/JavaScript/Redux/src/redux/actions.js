import { INCREMENT, DECREMENT, CHANGE_THEME } from "./types";

export function increment() {
  return {
    type: INCREMENT
  };
}

export function decrement() {
  return {
    type: DECREMENT
  };
}

export function changeTheme(newTheme) {
  return {
    type: CHANGE_THEME,
    payload: newTheme
  };
}

export function asyncIncrement() {
  return function(dispatch) {
    setTimeout(
      () =>
        dispatch({
          type: INCREMENT
        }),
      2000
    );
  };
}
