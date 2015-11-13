/// <reference path="./redux.d.ts" />

function counter(state: number, action: Redux.Action) {
    if (!state) {
        state = 0;
    }
    switch (action.type) {
        case 'INCREMENT':
            return state + 1;
        case 'DECREMENT':
            return state - 1;
        default:
            return state;
    }
}

function loggingMiddleware() {
    return (next: Redux.Dispatch) => (action: Redux.Action) => {
        console.log(action.type);
        next(action);
    };
}

let createStoreWithMiddleware = Redux.applyMiddleware(loggingMiddleware)(Redux.createStore);
let store = createStoreWithMiddleware(counter);


store.subscribe(() =>
    console.log(store.getState())
);

store.dispatch({ type: 'INCREMENT' });
