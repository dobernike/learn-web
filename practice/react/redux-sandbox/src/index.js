import { createStore } from 'redux';

const reducer = (state = 0, action) => {

    switch (action.type) {
        case `INC`:
            return state + 1;

        case `DEC`:
            return state - 1;

        case `RND`:
            return state + action.payload;

        default:
            return state;
    }
};

const store = createStore(reducer);

const inc = () => ({ type: `INC` })

const dec = () => ({ type: `DEC` })

const rnd = (payload) => ({ type: `RND`, payload })


document.getElementById(`inc`).addEventListener(`click`, () => {
    store.dispatch(inc())
});

document.getElementById(`dec`).addEventListener(`click`, () => {
    store.dispatch(dec())
});

document.getElementById(`rnd`).addEventListener(`click`, () => {
    const payload = Math.floor(Math.random() * 10);
    store.dispatch(rnd(payload));
});

const update = () => {
    document.getElementById(`counter`).innerHTML = store.getState();
};

store.subscribe(update);
