import { combineReducers } from 'redux';
import apartmentsList from './apartmentsListReducer';
import searchedList from './searchedListReducer';
import { ApartmentState } from './apartmentsListReducer';
import { SearchedState } from './searchedListReducer';

export type RootState = {
    apartmentsList: ApartmentState;
    searchedList: SearchedState;
};

export default combineReducers({
    searchedList,
    apartmentsList,
});
