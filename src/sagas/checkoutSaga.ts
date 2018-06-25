import {
    take,
    put,
    call,
    apply,
    CallEffectFn,
    select,
} from "redux-saga/effects";
import * as fetch from "isomorphic-fetch";

import {
    TOGGLE_CHECKING_OUT,
    QUANTITY_VERIFICATION_CHECKOUT_PHASE,
    CREDIT_VALIDATION_CHECKOUT_PHASE,
    ERROR_CHECKOUT_PHASE,
    PURCHASE_FINALIZATION_CHECKOUT_PHASE,
    SUCCESS_CHECKOUT_PHASE,
    setCheckoutPhase,
} from "../actions";

import { currentUserSelector } from "../selectors";

import { Map } from "immutable";

type User = Map<string, any>;

export function* validateCart(user: User) {
    const { validated }: { validated: boolean } = yield (yield call(
        fetch as CallEffectFn<any>,
        `http://localhost:8081/cart/validate/${user.get("id")}`,
    )).json();

    return validated;
}

export function* validateCreditCard(user: User) {
    const { validated }: { validated: boolean } = yield (yield call(
        fetch as CallEffectFn<any>,
        `http://localhost:8081/card/validate/${user.get("id")}`,
    )).json();

    return validated;
}

export function* executePurchase(user: User) {
    const { success }: { success: boolean } = yield (yield call(
        fetch as CallEffectFn<any>,
        `http://localhost:8081/card/charge/${user.get("id")}`,
    )).json();

    return success;
}

export function* checkout() {
    const user: User = yield select(currentUserSelector);
    yield put(setCheckoutPhase(QUANTITY_VERIFICATION_CHECKOUT_PHASE));
    const cartValidated = yield call(validateCart, user);

    if (!cartValidated) {
        yield put(setCheckoutPhase(ERROR_CHECKOUT_PHASE));
        return;
    }

    yield put(setCheckoutPhase(CREDIT_VALIDATION_CHECKOUT_PHASE));
    const cardValidated = yield call(validateCreditCard, user);

    if (!cardValidated) {
        yield put(setCheckoutPhase(ERROR_CHECKOUT_PHASE));
        return;
    }

    yield put(setCheckoutPhase(PURCHASE_FINALIZATION_CHECKOUT_PHASE));
    const purchaseSuccessful = yield call(executePurchase, user);

    if (!purchaseSuccessful) {
        yield put(setCheckoutPhase(ERROR_CHECKOUT_PHASE));
        return;
    }

    yield put(setCheckoutPhase(SUCCESS_CHECKOUT_PHASE));
}

export function* checkoutSaga() {
    while (true) {
        const isCheckingOut: boolean = yield take(TOGGLE_CHECKING_OUT);

        if (isCheckingOut) {
            yield call(checkout);
        }
    }
}
