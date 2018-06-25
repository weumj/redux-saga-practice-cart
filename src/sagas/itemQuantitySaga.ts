import {
    put,
    call,
    select,
    takeLatest,
    CallEffectFn,
} from "redux-saga/effects";
import fetch from "isomorphic-fetch";

import {
    INCREASE_ITEM_QUANTITY,
    DECREASE_ITEM_QUANTITY,
    decreaseItemQuantity,
    FETCHING,
    FETCHED,
    setItemQuantityFetchStatus,
} from "../actions";

import { currentUserSelector } from "../selectors";

export function* increaseItemQuantitySaga({ id }: { id: number | string }) {
    yield put(setItemQuantityFetchStatus(FETCHING));
    const user = yield select(currentUserSelector);
    const response: Response = yield call(
        fetch as CallEffectFn<any>,
        `http://localhost:8081/cart/add/${user.get("id")}/${id}`,
    );

    if (response.status !== 200) {
        yield put(decreaseItemQuantity(id, true));
        alert(
            "Sorry, there weren't enough items in stock to complete your request.",
        );
    }

    yield put(setItemQuantityFetchStatus(FETCHED));
}

export function* decreaseItemQuantitySaga({
    id,
    local,
}: {
    id: number | string;
    local: boolean;
}) {
    if (local) {
        return;
    }
    yield put(setItemQuantityFetchStatus(FETCHING));
    const user = yield select(currentUserSelector);
    const response: Response = yield call(
        fetch as CallEffectFn<any>,
        `http://localhost:8081/cart/remove/${user.get("id")}/${id}`,
    );

    if (response.status !== 200) {
        console.warn("Received non-200 statues:: ", response);
    }

    yield put(setItemQuantityFetchStatus(FETCHED));
}

export function* itemQuantitySaga() {
    yield [
        takeLatest(DECREASE_ITEM_QUANTITY, decreaseItemQuantitySaga as any),
        takeLatest(INCREASE_ITEM_QUANTITY, increaseItemQuantitySaga as any),
    ];
}
