import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

import getApartmens from './getApartmens';
import { RESULT_LIST_UPDATE } from '../constants/actionTypes';

function fetchResult(searchItem: string, pageNumber: number): any {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
        const responce = await getApartmens(searchItem, pageNumber);
        const payload = responce.listings;

        dispatch({ type: RESULT_LIST_UPDATE, payload });
        return responce;
    };
}

export default fetchResult;
