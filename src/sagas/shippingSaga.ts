import {
    put,
    call,
    select,
    takeLatest,
    CallEffectFn,
} from "redux-saga/effects";
import * as fetch from "isomorphic-fetch";

import { Map } from "immutable";

import {
    SET_CART_ITEMS,
    INCREASE_ITEM_QUANTITY,
    DECREASE_ITEM_QUANTITY,
    FETCHING,
    FETCHED,
    setShippingFetchStatus,
    setShippingCost,
} from "../actions";

import { cartItemsSelector } from "../selectors";

function* shipping() {
    yield put(setShippingFetchStatus(FETCHING));
    const items: any[] = yield select(cartItemsSelector);

    const itemRequestString = items
        .reduce((str, item: Map<string, any>) => {
            const quantity: number = item.get("quantity");

            for (let i = 0; i < quantity; i++) {
                str += item.get("id") + ",";
            }

            return str;
        }, "")
        .replace(/,\s*$/, "");

    const { total } = yield (yield call(
        fetch as CallEffectFn<any>,
        `http://localhost:8081/shipping/${itemRequestString}`,
    )).json();

    yield put(setShippingCost(total));
    yield put(setShippingFetchStatus(FETCHED));
}

export function* shippingSaga() {
    yield takeLatest(
        [SET_CART_ITEMS, INCREASE_ITEM_QUANTITY, DECREASE_ITEM_QUANTITY],
        shipping,
    );
}
