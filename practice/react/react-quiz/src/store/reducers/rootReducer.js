import { combineReducers } from "redux";
import quizReducer from "./quiz";

export default combineReducers({ quiz: quizReducer });
