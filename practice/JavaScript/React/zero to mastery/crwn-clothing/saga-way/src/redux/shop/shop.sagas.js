import { takeEvery } from 'redux-saga/effects';

import ShopActionTypes from './shop.types';

export function* fetchCollectionsAsync() {
  yield console.log('I am fired');
}

export function* fetchCollectionsStart() {
  yield takeEvery(
    ShopActionTypes.FETCH_COLLECTIONS_START,
    fetchCollectionsAsync
  );
}
