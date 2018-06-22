import { createStore, applyMiddleware, compose } from "redux";

import { createLogger } from "redux-logger";
import { Iterable } from "immutable";
import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";

import { getQuery } from "./utility";
import { reducer } from "./combineReducers";
import { defaultState } from "./defaultState";
import { initSagas } from "./initSaga";

const stateTransformer = state => {
    if (Iterable.isIterable(state)) return state.toJS();
    else return state;
};

const logger = createLogger({
    stateTransformer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const getStore = () => {
    const sagaMiddleware = createSagaMiddleware();
    const middleWares = [thunk, sagaMiddleware];
    if (getQuery()["logger"]) {
        middleWares.push(logger);
    }
    const composables = [applyMiddleware(...middleWares)];
    const enhancer = composeEnhancers(...composables);
    const store = createStore(reducer, defaultState, enhancer);

    initSagas(sagaMiddleware);
    return store;
};
