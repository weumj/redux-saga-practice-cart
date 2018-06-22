import { take, put, call, fork, CallEffectFn } from "redux-saga/effects";
import * as fetch from "isomorphic-fetch";

import { SET_CART_ITEMS, setItemDetails } from "../actions";

export function* loadItemDetails(item: any) {
    const { id } = item;

    const response = yield call(
        fetch as CallEffectFn<any>,
        `http://localhost:8081/items/${id}`,
    );
    const { "0": info } = yield response.json();

    yield put(setItemDetails(info));
}

export function* itemDetailsSaga() {
    const { items }: { items: any[] } = yield take(SET_CART_ITEMS);
    yield items.map(item => fork(loadItemDetails, item));
}
