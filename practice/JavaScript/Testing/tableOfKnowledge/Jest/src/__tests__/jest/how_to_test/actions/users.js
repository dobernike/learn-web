// src/actions/users.js
import axios from "axios";

export const getUsers = () => dispatch => {
  dispatch({
    type: "GET_USERS",
    payload: axios.get("https://jsonplaceholder.typicode.com/users")
  });
};
