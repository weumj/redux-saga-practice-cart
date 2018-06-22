import * as sagas from "./sagas";
import { SagaMiddleware } from "redux-saga";

export const initSagas = (sagaMiddleware: SagaMiddleware<any>): void => {
    Object.values(sagas).forEach(sagaMiddleware.run.bind(sagaMiddleware));
};
