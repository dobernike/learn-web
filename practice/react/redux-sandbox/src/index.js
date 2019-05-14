import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, bindActionCreators } from 'redux';

import Counter from './counter';

import reducer from './reducer';
import * as actions from './actions'

const store = createStore(reducer);
const { dispatch } = store;

const { inc, dec, rnd } = bindActionCreators(actions, dispatch);

const update = () => {
};

store.subscribe(update);

ReactDOM.render(<Counter
    counter={store.getState()}
    inc={inc}
    dec={dec}
    rnd={rnd}
/>,
    document.getElementById(`root`));