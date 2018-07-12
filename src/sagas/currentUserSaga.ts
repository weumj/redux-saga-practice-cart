import { take, put, call, apply, CallEffectFn } from "redux-saga/effects";
import * as fetch from "isomorphic-fetch";

import { GET_CURRENT_USER_INFO, setCurrentUser } from "../actions";

export function* currentUserSaga() {
    const { id } = yield take(GET_CURRENT_USER_INFO);
    const response = yield call(
        fetch as CallEffectFn<any>,
        `http://localhost:8081/user/${id}`,
    );
    const data = yield apply(response, response.json);

    yield put(setCurrentUser(data));
}
