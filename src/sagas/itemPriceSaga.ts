import { all, take, fork, put, call, CallEffectFn } from "redux-saga/effects";
import * as fetch from "isomorphic-fetch";

import {
    SET_CART_ITEMS,
    SET_CURRENT_USER,
    SET_ITEM_DETAILS,
    setItemPrice,
} from "../actions";

export function* fetchItemPriceSaga(id: string | number, currency: string) {
    const response: Response = yield call(
        fetch as CallEffectFn<any>,
        `http://localhost:8081/prices/${currency}/${id}`,
    );
    const json = yield response.json();
    const price = json[0].price;
    yield put(setItemPrice(id, price));
}

export function* itemPriceSaga() {
    const [{ user }, { items }]: [
        { user: object & { country: string } },
        { items: (object & { id: number | string })[] }
    ] = yield all([take(SET_CURRENT_USER), take(SET_CART_ITEMS)]);

    yield items.map(item => call(fetchItemPriceSaga, item.id, user.country));
}
