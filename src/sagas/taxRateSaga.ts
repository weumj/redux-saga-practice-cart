import { put, call, CallEffectFn, take } from "redux-saga/effects";
import * as fetch from "isomorphic-fetch";

import { SET_CURRENT_USER, setTaxRate } from "../actions";

export function* taxRateSaga() {
    const { user } = yield take(SET_CURRENT_USER);
    const { country } = user;

    const { rate } = yield (yield call(
        fetch as CallEffectFn<any>,
        `http://localhost:8081/tax/${country}`,
    )).json();

    yield put(setTaxRate(rate));
}
