import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

import getLocalStorage from '../../services/localStorage/getLocalStorage';
import { SEARCH_LIST_UPDATE } from '../constants/actionTypes';

function searchedListLoad(key: string) {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
        const payload = await getLocalStorage(key);

        dispatch({ type: SEARCH_LIST_UPDATE, payload });
    };
}

export default searchedListLoad;
