import { SEARCH_LIST_UPDATE } from '../constants/actionTypes';

export type SearchedState = {
    searchedList: string[];
};

const initialState: SearchedState = {
    searchedList: [],
};

function searchedListReducer(state = initialState, { type, payload }: any) {
    switch (type) {
        case SEARCH_LIST_UPDATE:
            return { ...state, searchedList: payload };
        default:
            return state;
    }
}

export default searchedListReducer;
